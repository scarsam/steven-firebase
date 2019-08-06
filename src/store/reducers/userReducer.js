import { USER_AUTH, ERROR_AUTH } from "../types";

const initialState = {
  user: null,
  error: null
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_AUTH:
      return {
        ...state,
        user: action.payload
      };
    case ERROR_AUTH:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

export default userReducer;
