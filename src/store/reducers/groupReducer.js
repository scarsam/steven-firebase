import {
  FETCH_GROUPS_REQUEST,
  FETCH_GROUPS_SUCCESS,
  FETCH_GROUPS_ERROR,
  CREATE_GROUP_REQUEST,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_ERROR,
  FETCH_GROUP_REQUEST,
  FETCH_GROUP_SUCCESS,
  FETCH_GROUP_ERROR,
  JOIN_GROUP_REQUEST,
  JOIN_GROUP_SUCCESS,
  JOIN_GROUP_ERROR,
  DELETE_GROUP_REQUEST,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_ERROR,
  LEAVE_GROUP_REQUEST,
  LEAVE_GROUP_SUCCESS,
  LEAVE_GROUP_ERROR
} from '../types';

const initialState = {
  createdGroups: [],
  joinedGroups: [],
  group: null,
  error: null,
  pending: false
};

function groupReducer(state = initialState, action) {
  switch (action.type) {
    case LEAVE_GROUP_REQUEST:
      return {
        ...state,
        pending: true
      };
    case LEAVE_GROUP_SUCCESS:
      return {
        ...state,
        pending: false,
        joinedGroups: state.joinedGroups
          .find(group => group.id === action.payload)
          .users.filter(group => group.users === action.user)
      };
    case LEAVE_GROUP_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload
      };
    case DELETE_GROUP_REQUEST:
      return {
        ...state,
        pending: true
      };
    case DELETE_GROUP_SUCCESS:
      return {
        ...state,
        pending: false,
        createdGroups: state.createdGroups.filter(
          group => group.id !== action.payload
        )
      };
    case DELETE_GROUP_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload
      };
    case JOIN_GROUP_REQUEST:
      return {
        ...state,
        pending: true
      };
    case JOIN_GROUP_SUCCESS:
      return {
        ...state,
        pending: false
      };
    case JOIN_GROUP_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    case FETCH_GROUPS_REQUEST:
      return {
        ...state,
        pending: true
      };
    case FETCH_GROUPS_SUCCESS:
      const { joinedGroups, createdGroups } = action.payload;
      return {
        ...state,
        joinedGroups,
        createdGroups,
        group: null,
        pending: false
      };
    case FETCH_GROUPS_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    case CREATE_GROUP_REQUEST:
      return {
        ...state,
        pending: true
      };
    case CREATE_GROUP_SUCCESS:
      return {
        ...state,
        createdGroups: [action.payload, ...state.createdGroups],
        pending: false
      };
    case CREATE_GROUP_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    case FETCH_GROUP_REQUEST:
      return {
        ...state,
        pending: true
      };
    case FETCH_GROUP_SUCCESS:
      return {
        ...state,
        group: action.payload,
        pending: false
      };
    case FETCH_GROUP_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    default:
      return state;
  }
}

export default groupReducer;
