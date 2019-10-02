import {
  EXPENSE_REQUEST,
  EXPENSE_SUCCESS,
  EXPENSE_ERROR,
  EXPENSE_RESET,
  USERS_TOTAL_REQUEST,
  USERS_TOTAL_SUCCESS,
  USERS_TOTAL_ERROR,
  USER_TOTAL_REQUEST,
  USER_TOTAL_SUCCESS,
  USER_TOTAL_ERROR,
  CREATED_EXPENSE_REQUEST,
  CREATED_EXPENSE_SUCCESS,
  CREATED_EXPENSE_ERROR
} from '../types';

const initialState = {
  expenses: [],
  totalExpenses: null,
  total: 0,
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
        expenses: [...action.payload],
        pending: false
      };
    case EXPENSE_ERROR:
      return {
        ...state,
        expenses: [],
        error: action.payload,
        pending: false
      };
    case EXPENSE_RESET:
      return {
        ...state,
        expenses: [],
        totalExpenses: null,
        total: 0,
        error: null,
        pending: false
      };
    case USERS_TOTAL_REQUEST:
      return {
        ...state,
        pending: true
      };
    case USERS_TOTAL_SUCCESS:
      return {
        ...state,
        totalExpenses: action.payload,
        pending: false
      };
    case USERS_TOTAL_ERROR:
      return {
        ...state,
        totalExpenses: null,
        error: action.payload,
        pending: false
      };
    case USER_TOTAL_REQUEST:
      return {
        ...state,
        pending: true
      };
    case USER_TOTAL_SUCCESS:
      return {
        ...state,
        total: action.payload,
        pending: false
      };
    case USER_TOTAL_ERROR:
      return {
        ...state,
        total: 0,
        error: action.payload,
        pending: false
      };
    case CREATED_EXPENSE_REQUEST:
      return {
        ...state,
        pending: true
      };
    case CREATED_EXPENSE_SUCCESS:
      const { total, expense } = action.payload;
      return {
        ...state,
        total,
        expenses: [expense, ...state.expenses],
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
