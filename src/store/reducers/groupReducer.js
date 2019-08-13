import {
  JOINED_GROUPS_REQUEST,
  JOINED_GROUPS_SUCCESS,
  JOINED_GROUPS_ERROR,
  CREATED_GROUPS_REQUEST,
  CREATED_GROUPS_SUCCESS,
  CREATED_GROUPS_ERROR,
  CREATE_GROUP_REQUEST,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_ERROR,
  GET_GROUP_REQUEST,
  GET_GROUP_SUCCESS,
  GET_GROUP_ERROR,
  JOIN_GROUP_REQUEST,
  JOIN_GROUP_SUCCESS,
  JOIN_GROUP_ERROR,
  DELETE_GROUP_REQUEST,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_ERROR
} from "../types";

const initialState = {
  createdGroups: [],
  joinedGroups: [],
  group: null,
  error: null,
  pending: false
};

function groupReducer(state = initialState, action) {
  switch (action.type) {
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
    case JOINED_GROUPS_REQUEST:
      return {
        ...state,
        pending: true
      };
    case JOINED_GROUPS_SUCCESS:
      return {
        ...state,
        joinedGroups: action.payload,
        group: null,
        pending: false
      };
    case JOINED_GROUPS_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    case CREATED_GROUPS_REQUEST:
      return {
        ...state,
        pending: false
      };
    case CREATED_GROUPS_SUCCESS:
      return {
        ...state,
        createdGroups: action.payload,
        group: null,
        pending: false
      };
    case CREATED_GROUPS_ERROR:
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
        createdGroups: [...state.createdGroups, action.payload],
        pending: false
      };
    case CREATE_GROUP_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    case GET_GROUP_REQUEST:
      return {
        ...state,
        pending: true
      };
    case GET_GROUP_SUCCESS:
      return {
        ...state,
        group: action.payload,
        pending: false
      };
    case GET_GROUP_ERROR:
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
