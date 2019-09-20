import {
  EXPENSE_REQUEST,
  EXPENSE_SUCCESS,
  EXPENSES_SUCCESS,
  EXPENSE_ERROR,
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
        total: action.total,
        pending: false
      };
    case EXPENSES_SUCCESS:
      return {
        ...state,
        totalExpenses: action.payload,
        pending: false
      };
    case EXPENSE_ERROR:
      return {
        ...state,
        expenses: [],
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
