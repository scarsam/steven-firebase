import "firebase/auth";
import "firebase/firestore";
import firebase from "../../firebase/firebase";
import {
  JOINED_GROUPS_REQUEST,
  JOINED_GROUPS_SUCCESS,
  JOINED_GROUPS_ERROR,
  CREATED_GROUPS_REQUEST,
  CREATED_GROUPS_SUCCESS,
  CREATED_GROUPS_ERROR
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
