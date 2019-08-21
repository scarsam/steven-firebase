import firebase from "./index";
import "firebase/auth";
import "firebase/firestore";

// Group db

export const dbLeaveGroup = async (user, id) => {
  const data = {};
  try {
    await firebase
      .firestore()
      .collectionGroup("groups")
      .where("id", "==", id)
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
    data.group = id;
  } catch (err) {
    data.error = err;
  }
  return data;
};

export const dbDeleteGroup = async id => {
  const data = {};
  try {
    await firebase
      .firestore()
      .collectionGroup("groups")
      .where("id", "==", id)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          doc.ref.delete();
        });
      });
    data.group = id;
  } catch (err) {
    data.error = err;
  }
  return data;
};

export const dbJoinedGroups = async user => {
  const data = {};
  try {
    await firebase
      .firestore()
      .collectionGroup("groups")
      .where("users", "array-contains", {
        id: user.uid,
        name: user.displayName
      })
      .get()
      .then(snapshot => {
        const groups = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        data.groups = groups;
      });
  } catch (err) {
    data.error = err;
  }
  return data;
};

export const dbCreatedGroups = async user => {
  const data = {};
  try {
    await firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("groups")
      .get()
      .then(snapshot => {
        const groups = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        data.groups = groups;
      });
  } catch (err) {
    data.error = err;
  }
  return data;
};

export const dbFindGroup = async id => {
  const data = {};
  try {
    await firebase
      .firestore()
      .collectionGroup("groups")
      .where("id", "==", id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          data.group = { ...doc.data(), id: doc.id };
        });
      });
  } catch (err) {
    data.error = err;
  }
  return data;
};

export const dbJoinGroup = async (user, id) => {
  const data = {};
  try {
    await firebase
      .firestore()
      .collectionGroup("groups")
      .where("id", "==", id)
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
  } catch (err) {
    data.error = err;
  }
  return data;
};

export const dbCreateGroup = async (user, name) => {
  const data = {};
  try {
    let groupIndex;
    const increment = firebase.firestore.FieldValue.increment(1);

    const statsRef = await firebase
      .firestore()
      .collection("users")
      .doc("--stats--");

    await statsRef.set({ index: increment }, { merge: true });
    await statsRef.get().then(doc => {
      groupIndex = doc.data().index;
    });

    const newGroupRef = await firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("groups")
      .doc(`${groupIndex}`);
    const newGroup = {
      id: newGroupRef.id,
      owner: {
        id: user.uid,
        name: user.displayName
      },
      users: [],
      name,
      created: Date.now()
    };
    newGroupRef.set(newGroup);
    data.group = newGroup;
  } catch (err) {
    data.error = err;
  }
  return data;
};

// User db

export const dbSocialAuth = async provider => {
  const data = {};
  try {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    const response =
      provider === "google"
        ? await firebase.auth().signInWithPopup(googleProvider)
        : await firebase.auth().signInWithPopup(facebookProvider);
    await firebase
      .firestore()
      .collection("users")
      .doc(response.user.uid);
    data.user = response.user;
  } catch (err) {
    data.error = err;
  }
  return data;
};

export const dbUserListener = () => {
  return new Promise((resolve, reject) => {
    try {
      firebase.auth().onAuthStateChanged(user => {
        resolve(user);
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const dbLogout = async () => {
  const data = {};
  try {
    await firebase.auth().signOut();
  } catch (err) {
    data.error = err;
  }
  return data;
};

export const dbGetExpenses = async (user, groupId) => {
  const data = {};
  try {
    await firebase
      .firestore()
      .collection("users")
      .doc(`${user.uid}`)
      .collection("expenses")
      .doc(`${groupId}`)
      .get()
      .then(doc => {
        data.expenses = doc.data().expenses;
      });
  } catch (err) {
    data.error = err;
  }
  return data;
};

export const dbCreateExpenses = async (
  payee,
  user,
  description,
  amount,
  friend,
  groupId
) => {
  const data = {};

  const plusOrMinus = id =>
    payee === id ? parseFloat(amount) : parseFloat(-amount);

  // Get a new write batch
  const batch = firebase.firestore().batch();

  const userExpenseRef = firebase
    .firestore()
    .collection("users")
    .doc(`${user.uid}`)
    .collection("expenses")
    .doc(`${groupId}`);
  batch.set(
    userExpenseRef,
    {
      expenses: firebase.firestore.FieldValue.arrayUnion({
        amount: plusOrMinus(user.uid),
        description,
        from: friend.label
      })
    },
    { merge: true }
  );

  const friendExpenseRef = firebase
    .firestore()
    .collection("users")
    .doc(`${friend.value}`)
    .collection("expenses")
    .doc(`${groupId}`);
  batch.set(
    friendExpenseRef,
    {
      expenses: firebase.firestore.FieldValue.arrayUnion({
        amount: plusOrMinus(friend.value),
        description,
        from: user.displayName
      })
    },
    { merge: true }
  );

  // Commit the batch
  try {
    await batch.commit();
    data.expenses = {
      amount: plusOrMinus(user.uid),
      description,
      from: friend.label
    };
  } catch (err) {
    data.error = err;
  }
  return data;
};
