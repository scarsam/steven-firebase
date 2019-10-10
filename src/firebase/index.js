import firebase from 'firebase/app';
import { amountsCalculator } from '../utils/expense';
import 'firebase/auth';
import 'firebase/firestore';
import uniqid from 'uniqid';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.google = new firebase.auth.GoogleAuthProvider();
    this.facebook = new firebase.auth.FacebookAuthProvider();
  }

  currentUser() {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged(user => {
        if (user) {
          resolve(user);
        } else {
          reject('No currently logged in user');
        }
      });
    });
  }

  signInWithPopup(provider) {
    return provider === 'google'
      ? this.auth.signInWithPopup(this.google)
      : this.auth.signInWithPopup(this.facebook);
  }

  addUser(user) {
    return this.db.collection('users').doc(user.uid);
  }

  signOut() {
    return this.auth.signOut();
  }

  fetchCreatedGroups(user) {
    return this.db
      .collection('users')
      .doc(user.uid)
      .collection('groups')
      .orderBy('created', 'desc')
      .get()
      .then(snapshot => {
        const groups = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        return groups;
      });
  }

  fetchJoinedGroups(user) {
    return this.db
      .collectionGroup('groups')
      .where('users', 'array-contains', {
        id: user.uid,
        name: user.displayName
      })
      .orderBy('created', 'desc')
      .get()
      .then(snapshot => {
        return snapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          .filter(group => group.owner.id !== user.uid);
      });
  }

  fetchGroup(id) {
    return this.db
      .collectionGroup('groups')
      .where('id', '==', id)
      .get()
      .then(querySnapshot => {
        const group = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        return group[0];
      });
  }

  joinGroup(id, user) {
    return this.db
      .collectionGroup('groups')
      .where('id', '==', id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({
            users: firebase.firestore.FieldValue.arrayUnion({
              id: user.uid,
              name: user.displayName
            })
          });
        });
      });
  }

  async createGroup(user, name) {
    let groupIndex;
    const increment = firebase.firestore.FieldValue.increment(1);

    const statsRef = this.db.collection('users').doc('--stats--');

    await statsRef.set({ index: increment }, { merge: true });
    await statsRef.get().then(doc => {
      groupIndex = doc.data().index;
    });

    const newGroupRef = await this.db
      .collection('users')
      .doc(user.uid)
      .collection('groups')
      .doc(`${groupIndex}`);
    const newGroup = {
      id: newGroupRef.id,
      owner: {
        id: user.uid,
        name: user.displayName
      },
      users: [{ id: user.uid, name: user.displayName }],
      name,
      created: Date.now()
    };
    newGroupRef.set(newGroup, { merge: true });
    return newGroup;
  }

  deleteGroup(id) {
    return this.db
      .collectionGroup('groups')
      .where('id', '==', id)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          doc.ref.delete();
        });
      });
  }

  leaveGroup(user, id) {
    return this.db
      .collectionGroup('groups')
      .where('id', '==', id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({
            users: firebase.firestore.FieldValue.arrayRemove({
              id: user.uid,
              name: user.displayName
            })
          });
        });
      });
  }

  fetchUsersTotal(users, id) {
    return users.reduce((arr, user) => {
      let baseRef = this.db
        .collection('users')
        .doc(`${user.id}`)
        .collection('groups')
        .doc(`${id}`)
        .collection('expenses')
        .doc('--stats--');
      baseRef.get().then(querySnapshot => {
        let total;
        let obj = {};
        if (querySnapshot.exists) {
          total = querySnapshot.data().total;
        } else {
          total = 0;
        }
        obj.name = user.name;
        obj.total = total;
        arr.push(obj);
      });
      return arr;
    }, []);
  }

  fetchUserExpenses(user, id) {
    return this.db
      .collection('users')
      .doc(`${user.uid}`)
      .collection('groups')
      .doc(`${id}`)
      .collection('expenses')
      .orderBy('created', 'desc')
      .get()
      .then(querySnapshot => {
        return querySnapshot.docs
          .map(doc => ({ ...doc.data() }))
          .filter(doc => doc.id !== '--stats--');
      });
  }

  fetchUserTotal(user, id) {
    return this.db
      .collection('users')
      .doc(`${user.uid}`)
      .collection('groups')
      .doc(`${id}`)
      .collection('expenses')
      .doc('--stats--')
      .get()
      .then(doc => (doc.exists ? doc.data().total : 0));
  }

  deleteExpense(users, id, groupId) {
    users.forEach(async user => {
      await this.db
        .collection('users')
        .doc(`${user.id}`)
        .collection('groups')
        .doc(`${groupId}`)
        .collection('expenses')
        .where('id', '==', id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const reverseAmount = doc.data().amount * -1;
            const updateValue = firebase.firestore.FieldValue.increment(
              reverseAmount
            );
            doc.ref.parent.doc('--stats--').update({ total: updateValue });
            doc.ref.delete();
          });
        });
    });
  }

  async createExpense(split, paid, description, users, currentUser, groupId) {
    let newExpense;
    let newExpenseRef;
    let increment;
    let totalRef;
    let currentUserExpense;
    const batch = this.db.batch();
    const id = uniqid();

    const { totalAmount, userAmounts } = amountsCalculator(
      split,
      paid,
      users,
      currentUser
    );

    const positiveOrNegative = (userId, amount) => {
      return userId === currentUser.uid
        ? parseFloat(parseFloat(amount).toFixed(2))
        : -parseFloat(parseFloat(amount).toFixed(2));
    };
    userAmounts
      .filter(user => user.amount !== '')
      .forEach(async user => {
        let baseRef = this.db
          .collection('users')
          .doc(`${user.id}`)
          .collection('groups')
          .doc(`${groupId}`)
          .collection('expenses');
        increment = firebase.firestore.FieldValue.increment(
          positiveOrNegative(user.id, user.amount)
        );
        totalRef = baseRef.doc('--stats--');
        newExpenseRef = baseRef.doc();
        newExpense = {
          id,
          description,
          payerId: currentUser.uid,
          totalAmount,
          amount: positiveOrNegative(user.id, user.amount),
          created: Date.now()
        };
        batch.set(newExpenseRef, { ...newExpense });
        if (user.id === currentUser.uid) {
          currentUserExpense = newExpense;
        }
        await totalRef.set({ total: increment }, { merge: true });
      });
    await batch.commit();
    return currentUserExpense;
  }
}

const FirebaseAPI = new Firebase();
export default FirebaseAPI;
