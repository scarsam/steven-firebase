import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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

  fetchGroups(user) {
    return this.db
      .collection('users')
      .doc(user.uid)
      .collection('groups')
      .get()
      .then(snapshot => {
        const groups = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        return groups;
      });
  }

  fetchGroup(id) {
    return this.db
      .collectionGroup('groups')
      .where('id', '==', id)
      .get()
      .then(querySnapshot => {
        debugger;
        querySnapshot.docs.map(doc => {
          return { ...doc.data(), id: doc.id };
        });
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
}

const FirebaseAPI = new Firebase();
export default FirebaseAPI;
