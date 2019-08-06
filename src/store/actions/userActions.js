import { USER_AUTH, ERROR_AUTH } from "../types";
import firebase from "../../firebase/firebase";
import "firebase/auth";
import "firebase/firestore";

export const auth = provider => async dispatch => {
  try {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    const credentials =
      provider === "google"
        ? await firebase.auth().signInWithPopup(googleProvider)
        : await firebase.auth().signInWithPopup(facebookProvider);
    const user = await firebase
      .firestore()
      .collection("users")
      .doc(credentials.user.uid);
    dispatch({ type: USER_AUTH, payload: user });
  } catch (err) {
    dispatch({ type: ERROR_AUTH, payload: err });
  }
};

export const logout = async dispatch => {
  await firebase.auth().signOut();
};
