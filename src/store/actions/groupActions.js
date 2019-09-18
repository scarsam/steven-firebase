import FirebaseAPI from '../../firebase';
import history from '../../routes/History';
import { slugify } from '../../utils/slugify';
import { fetchAllExpenses } from './expenseActions';

import {
  FETCH_GROUPS_REQUEST,
  FETCH_GROUPS_SUCCESS,
  FETCH_GROUPS_ERROR,
  JOIN_GROUP_REQUEST,
  JOIN_GROUP_SUCCESS,
  JOIN_GROUP_ERROR,
  CREATE_GROUP_REQUEST,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_ERROR,
  FETCH_GROUP_REQUEST,
  FETCH_GROUP_SUCCESS,
  FETCH_GROUP_ERROR,
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR,
  DELETE_GROUP_REQUEST,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_ERROR,
  LEAVE_GROUP_REQUEST,
  LEAVE_GROUP_SUCCESS,
  LEAVE_GROUP_ERROR
} from '../types';

export const leaveGroup = (user, id) => async dispatch => {
  dispatch({ type: LEAVE_GROUP_REQUEST });
  try {
    await FirebaseAPI.leaveGroup(user, id);
    dispatch({ type: LEAVE_GROUP_SUCCESS, payload: id, user });
  } catch (error) {
    dispatch({ type: LEAVE_GROUP_ERROR, payload: error });
  }
};

export const deleteGroup = id => async dispatch => {
  dispatch({ type: DELETE_GROUP_REQUEST });
  try {
    await FirebaseAPI.deleteGroup(id);
    dispatch({ type: DELETE_GROUP_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_GROUP_ERROR, payload: error });
  }
};

export const fetchGroups = user => async dispatch => {
  dispatch({ type: FETCH_GROUPS_REQUEST });
  try {
    const createdGroups = await FirebaseAPI.fetchCreatedGroups(user);
    const joinedGroups = await FirebaseAPI.fetchJoinedGroups(user);
    dispatch({
      type: FETCH_GROUPS_SUCCESS,
      payload: { createdGroups, joinedGroups }
    });
  } catch (error) {
    dispatch({ type: FETCH_GROUPS_ERROR, payload: error });
  }
};

export const fetchGroup = id => async dispatch => {
  dispatch({ type: FETCH_GROUP_REQUEST });
  try {
    const group = await FirebaseAPI.fetchGroups(id);
    dispatch({ type: FETCH_GROUP_SUCCESS, payload: group });
    dispatch(fetchAllExpenses(id, group.users));
  } catch (error) {
    dispatch({ type: FETCH_GROUP_ERROR, payload: error });
  }
};

export const joinGroup = (provider, user, id, group) => async dispatch => {
  if (!user) {
    dispatch({ type: USER_REQUEST });
    try {
      const { user } = await FirebaseAPI.signInWithPopup(provider);
      await FirebaseAPI.addUser(user);
      dispatch({ type: USER_SUCCESS, payload: user });
    } catch (error) {
      dispatch({ type: USER_ERROR, payload: error });
    }
  }

  dispatch({ type: JOIN_GROUP_REQUEST });
  try {
    await FirebaseAPI.joinGroup(id, user);
    dispatch({ type: JOIN_GROUP_SUCCESS });
  } catch (error) {
    dispatch({ type: JOIN_GROUP_ERROR, payload: error });
  }
  history.push(`/group/${id}/${slugify(group.name)}`);
};

export const createGroup = (user, name) => async dispatch => {
  dispatch({ type: CREATE_GROUP_REQUEST });
  try {
    const newGroup = await FirebaseAPI.createGroup(user, name);
    dispatch({ type: CREATE_GROUP_SUCCESS, payload: newGroup });
  } catch (error) {
    dispatch({ type: CREATE_GROUP_ERROR, payload: error });
  }
};
