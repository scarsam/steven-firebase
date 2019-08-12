import { dbLogout, dbSocialAuth, dbUserListener } from "../../firebase/helpers";
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
  const { user, error } = await dbSocialAuth(provider);
  if (user) dispatch({ type: USER_SUCCESS, payload: user });
  if (error) dispatch({ type: USER_ERROR, payload: error });
  history.push("/dashboard");
};

export const userListener = async dispatch => {
  dispatch({ type: USER_REQUEST });
  const { user, error } = await dbUserListener();
  if (user) dispatch({ type: CURRENT_USER, payload: user });
  if (error) dispatch({ type: USER_ERROR, payload: error });
  if (!user && !error) {
    dispatch({ type: NO_CURRENT_USER, payload: null });
    if (window.location.pathname.includes("invite")) {
      const url = window.location.pathname;
      history.push(url);
    } else {
      history.push("/");
    }
  }
};

export const logout = async dispatch => {
  dispatch({ type: USER_REQUEST });
  const { error } = await dbLogout();
  if (error) {
    dispatch({ type: USER_ERROR, payload: error });
  } else {
    dispatch({ type: USER_LOGOUT });
    history.push("/");
  }
};
