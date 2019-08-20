import {
  EXPENSE_REQUEST,
  EXPENSE_SUCCESS,
  EXPENSE_ERROR,
  CREATED_EXPENSE_REQUEST,
  CREATED_EXPENSE_SUCCESS,
  CREATED_EXPENSE_ERROR
} from "../types";

const initialState = {
  expenses: [],
  error: null,
  pending: false
};

function expenseReducer(state = initialState, action) {
  switch (action.type) {
    case EXPENSE_REQUEST:
      return {
        ...state,
        pending: true
      };
    case EXPENSE_SUCCESS:
      return {
        ...state,
        expenses: action.payload,
        pending: false
      };
    case EXPENSE_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    case CREATED_EXPENSE_REQUEST:
      return {
        ...state,
        pending: true
      };
    case CREATED_EXPENSE_SUCCESS:
      return {
        ...state,
        expenses: { items: [...state.expenses.items, action.payload] },
        pending: false
      };
    case CREATED_EXPENSE_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    default:
      return state;
  }
}

export default expenseReducer;
