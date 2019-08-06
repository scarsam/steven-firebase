import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR,
  USER_LOGOUT,
  NO_CURRENT_USER,
  CURRENT_USER
} from "../types";

const initialState = {
  user: null,
  error: null,
  pending: false
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        pending: true
      };
    case USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        pending: false
      };
    case USER_LOGOUT:
      return {
        ...state,
        user: null,
        pending: false
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    case CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        pending: false
      };
    case NO_CURRENT_USER:
      return {
        ...state,
        user: null,
        pending: false
      };
    default:
      return state;
  }
}

export default userReducer;
