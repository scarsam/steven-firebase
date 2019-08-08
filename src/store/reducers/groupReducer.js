import {
  JOINED_GROUPS_REQUEST,
  JOINED_GROUPS_SUCCESS,
  JOINED_GROUPS_ERROR,
  CREATED_GROUPS_REQUEST,
  CREATED_GROUPS_SUCCESS,
  CREATED_GROUPS_ERROR
} from "../types";

const initialState = {
  createdGroups: [],
  joinedGroups: [],
  error: null,
  pending: false
};

function groupReducer(state = initialState, action) {
  switch (action.type) {
    case JOINED_GROUPS_REQUEST:
      return {
        ...state,
        pending: true
      };
    case JOINED_GROUPS_SUCCESS:
      return {
        ...state,
        joinedGroups: action.payload,
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
        pending: false
      };
    case CREATED_GROUPS_ERROR:
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
