import firebase from "../../firebase";
import "firebase/auth";
import "firebase/firestore";
import history from "../../routes/History";
import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR,
  USER_LOGOUT,
  CURRENT_USER,
  NO_CURRENT_USER
} from "../types";

export const userAuth = provider => async dispatch => {
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
  } catch (err) {
    dispatch({ type: USER_ERROR, payload: err });
  }
  history.push("/dashboard");
};

export const userListener = async dispatch => {
  dispatch({ type: USER_REQUEST });
  const user = await new Promise((resolve, reject) => {
    try {
      firebase.auth().onAuthStateChanged(user => {
        resolve(user);
      });
    } catch (err) {
      reject(err);
    }
  });
  if (user) dispatch({ type: CURRENT_USER, payload: user });
  if (!user) {
    dispatch({ type: NO_CURRENT_USER, payload: null });
    if (window.location.pathname.includes("invite")) {
      const url = window.location.pathname;
      history.push(url);
    } else {
      history.push("/");
    }
  }
};

export const userLogout = async dispatch => {
  dispatch({ type: USER_REQUEST });
  try {
    await firebase.auth().signOut();
    dispatch({ type: USER_LOGOUT });
  } catch (err) {
    dispatch({ type: USER_ERROR, payload: err });
  }
  history.push("/");
};
