import firebase from "./index";

const data = { groups: [], group: null, error: null, user: null };

export const dbJoinedGroups = async user => {
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

export const dbSocialAuth = async provider => {
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
};

export const dbCreateGroup = async (user, name) => {
  try {
    let groupIndex;
    const increment = firebase.firestore.FieldValue.increment(1);

    const statsRef = await firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("groups")
      .doc("--stats--");

    await statsRef.update({ index: increment });
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
