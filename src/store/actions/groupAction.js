import {
  dbJoinedGroups,
  dbCreatedGroups,
  dbFindGroup,
  dbJoinGroup,
  dbSocialAuth,
  dbCreateGroup,
  dbDeleteGroup
} from "../../firebase/helpers";
import history from "../../routes/History";
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
  USER_ERROR,
  DELETE_GROUP_REQUEST,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_ERROR,
  LEAVE_GROUP_REQUEST,
  LEAVE_GROUP_SUCCESS,
  LEAVE_GROUP_ERROR
} from "../types";

export const leaveGroup = id => async dispatch => {
  dispatch({ type: LEAVE_GROUP_REQUEST });
  const { group, error } = await dbLeaveGroup(id);
  if (group) dispatch({ type: LEAVE_GROUP_SUCCESS, payload: group });
  if (error) dispatch({ type: LEAVE_GROUP_ERROR, payload: error });
};

export const deleteGroup = id => async dispatch => {
  dispatch({ type: DELETE_GROUP_REQUEST });
  const { group, error } = await dbDeleteGroup(id);
  if (group) dispatch({ type: DELETE_GROUP_SUCCESS, payload: group });
  if (error) dispatch({ type: DELETE_GROUP_ERROR, payload: error });
};

export const getJoinedGroups = user => async dispatch => {
  dispatch({ type: JOINED_GROUPS_REQUEST });
  const { groups, error } = await dbJoinedGroups(user);
  if (groups) dispatch({ type: JOINED_GROUPS_SUCCESS, payload: groups });
  if (error) dispatch({ type: JOINED_GROUPS_ERROR, payload: error });
};

export const getCreatedGroups = user => async dispatch => {
  dispatch({ type: CREATED_GROUPS_REQUEST });
  const { groups, error } = await dbCreatedGroups(user);
  if (groups) dispatch({ type: CREATED_GROUPS_SUCCESS, payload: groups });
  if (error) dispatch({ type: CREATED_GROUPS_ERROR, payload: error });
};

export const getGroup = id => async dispatch => {
  dispatch({ type: GET_GROUP_REQUEST });
  const { group, error } = await dbFindGroup(id);
  if (group) dispatch({ type: GET_GROUP_SUCCESS, payload: group });
  if (error) dispatch({ type: GET_GROUP_ERROR, payload: error });
};

export const joinGroup = (provider, user, id) => async dispatch => {
  if (!user) {
    dispatch({ type: USER_REQUEST });
    const { user, error } = await dbSocialAuth(provider);
    if (user) dispatch({ type: USER_SUCCESS, payload: user });
    if (error) dispatch({ type: USER_ERROR, payload: error });
  }

  dispatch({ type: JOIN_GROUP_REQUEST });
  const { error } = await dbJoinGroup(user, id);
  if (error) {
    dispatch({ type: JOIN_GROUP_ERROR, payload: error });
  } else {
    dispatch({ type: JOIN_GROUP_SUCCESS });
    history.push(`/group/${id}`);
  }
};

export const createGroup = (user, name) => async dispatch => {
  dispatch({ type: CREATE_GROUP_REQUEST });
  const { group, error } = await dbCreateGroup(user, name);
  if (group) dispatch({ type: CREATE_GROUP_SUCCESS, payload: group });
  if (error) dispatch({ type: CREATE_GROUP_ERROR, payload: error });
};
