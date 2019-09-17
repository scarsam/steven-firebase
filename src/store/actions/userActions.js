import FirebaseAPI from '../../firebase';
import history from '../../routes/History';
import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR,
  USER_LOGOUT,
  CURRENT_USER,
  NO_CURRENT_USER
} from '../types';

export const userAuth = provider => async dispatch => {
  dispatch({ type: USER_REQUEST });
  try {
    const { user } = await FirebaseAPI.signInWithPopup(provider);
    await FirebaseAPI.addUser(user);
    dispatch({ type: USER_SUCCESS, payload: user });
    history.push('/dashboard');
  } catch (error) {
    dispatch({ type: USER_ERROR, payload: error });
  }
};

export const fetchCurrentUser = async dispatch => {
  dispatch({ type: USER_REQUEST });
  try {
    const user = await FirebaseAPI.currentUser();
    dispatch({ type: CURRENT_USER, payload: user });
  } catch (error) {
    console.info(error);
    dispatch({ type: NO_CURRENT_USER, payload: null });
    if (window.location.pathname.includes('invite')) {
      const url = window.location.pathname;
      history.push(url);
    } else {
      history.push('/');
    }
  }
};

export const userLogout = async dispatch => {
  dispatch({ type: USER_REQUEST });
  try {
    await FirebaseAPI.signOut();
    dispatch({ type: USER_LOGOUT });
  } catch (err) {
    dispatch({ type: USER_ERROR, payload: err });
  }
  history.push('/');
};
