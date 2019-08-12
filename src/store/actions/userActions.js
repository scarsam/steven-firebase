import "firebase/auth";
import "firebase/firestore";
import firebase from "../../firebase";
import history from "../../routes/History";
import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR,
  USER_LOGOUT,
  CURRENT_USER,
  NO_CURRENT_USER
} from "../types";

export const auth = provider => async dispatch => {
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
    history.push("/dashboard");
  } catch (err) {
    dispatch({ type: USER_ERROR, payload: err });
  }
};

export const authAndJoin = provider => async dispatch => {
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
    history.push("/dashboard");
  } catch (err) {
    dispatch({ type: USER_ERROR, payload: err });
  }
};

export const userListener = async dispatch => {
  dispatch({ type: USER_REQUEST });
  try {
    await firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch({ type: CURRENT_USER, payload: user });
      } else {
        dispatch({ type: NO_CURRENT_USER, payload: null });
        history.push("/");
      }
    });
  } catch (err) {
    dispatch({ type: USER_ERROR, payload: err });
  }
};

export const logout = async dispatch => {
  dispatch({ type: USER_REQUEST });
  try {
    await firebase.auth().signOut();
    dispatch({ type: USER_LOGOUT });
    history.push("/");
  } catch (err) {
    dispatch({ type: USER_ERROR, payload: err });
  }
};
