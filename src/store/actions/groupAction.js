import "firebase/auth";
import "firebase/firestore";
import history from "../../routes/History";
import firebase from "../../firebase";
import {
  JOINED_GROUPS_REQUEST,
  JOINED_GROUPS_SUCCESS,
  JOINED_GROUPS_ERROR,
  JOIN_GROUP_REQUEST,
  JOIN_GROUP_SUCCESS,
  JOIN_GROUP_ERROR,
  CREATED_GROUPS_REQUEST,
  CREATED_GROUPS_SUCCESS,
  CREATED_GROUPS_ERROR,
  CREATE_GROUP_REQUEST,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_ERROR,
  GET_GROUP_REQUEST,
  GET_GROUP_SUCCESS,
  GET_GROUP_ERROR,
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR
} from "../types";

export const getJoinedGroups = user => async dispatch => {
  dispatch({ type: JOINED_GROUPS_REQUEST });
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
        dispatch({ type: JOINED_GROUPS_SUCCESS, payload: groups });
      });
  } catch (err) {
    dispatch({ type: JOINED_GROUPS_ERROR, payload: err });
  }
};

export const getCreatedGroups = user => async dispatch => {
  dispatch({ type: CREATED_GROUPS_REQUEST });
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
        dispatch({ type: CREATED_GROUPS_SUCCESS, payload: groups });
      });
  } catch (err) {
    dispatch({ type: CREATED_GROUPS_ERROR, payload: err });
  }
};

export const getGroup = id => async dispatch => {
  dispatch({ type: GET_GROUP_REQUEST });
  try {
    await firebase
      .firestore()
      .collectionGroup("groups")
      .where("id", "==", id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          dispatch({
            type: GET_GROUP_SUCCESS,
            payload: { ...doc.data(), id: doc.id }
          });
        });
      });
  } catch (err) {
    dispatch({ type: GET_GROUP_ERROR, payload: err });
  }
};

export const joinGroup = (provider, user, id) => async dispatch => {
  if (!user) {
    dispatch({ type: USER_REQUEST });
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
      dispatch({ type: USER_SUCCESS, payload: response.user });

      user = response.user;
    } catch (err) {
      dispatch({ type: USER_ERROR, payload: err });
    }
  }

  dispatch({ type: JOIN_GROUP_REQUEST });
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
    dispatch({ type: JOIN_GROUP_SUCCESS });
    history.push(`/group/${id}`);
  } catch (err) {
    dispatch({ type: JOIN_GROUP_ERROR, payload: err });
  }
};

export const createGroup = (user, name) => async dispatch => {
  dispatch({ type: CREATE_GROUP_REQUEST });
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
    dispatch({ type: CREATE_GROUP_SUCCESS, payload: newGroup });
  } catch (err) {
    dispatch({ type: CREATE_GROUP_ERROR, payload: err });
  }
};
