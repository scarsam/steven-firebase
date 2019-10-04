import FirebaseAPI from '../../firebase';
import {
  EXPENSE_REQUEST,
  EXPENSE_SUCCESS,
  EXPENSE_ERROR,
  EXPENSE_RESET,
  EXPENSE_DELETED,
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

export const resetExpenses = () => dispatch => {
  dispatch({ type: EXPENSE_RESET });
};

export const fetchUsersTotal = (users, id) => async dispatch => {
  dispatch({ type: USERS_TOTAL_REQUEST });
  try {
    const expenses = await FirebaseAPI.fetchUsersTotal(users, id);
    dispatch({ type: USERS_TOTAL_SUCCESS, payload: expenses });
  } catch (error) {
    console.error(error);
    dispatch({ type: USERS_TOTAL_ERROR, payload: error });
  }
};

export const fetchUserTotal = (user, id) => async dispatch => {
  dispatch({ type: USER_TOTAL_REQUEST });
  try {
    const total = await FirebaseAPI.fetchUserTotal(user, id);
    dispatch({ type: USER_TOTAL_SUCCESS, payload: total });
  } catch (error) {
    console.error(error);
    dispatch({ type: USER_TOTAL_ERROR, payload: error });
  }
};

export const fetchUserExpenses = (user, id) => async dispatch => {
  dispatch({ type: EXPENSE_REQUEST });
  try {
    const expenses = await FirebaseAPI.fetchUserExpenses(user, id);
    dispatch({ type: EXPENSE_SUCCESS, payload: expenses });
  } catch (error) {
    console.error(error);
    dispatch({ type: EXPENSE_ERROR, payload: error });
  }
};

export const createExpense = (
  split,
  paid,
  description,
  users,
  currentUser,
  groupId
) => async dispatch => {
  dispatch({ type: CREATED_EXPENSE_REQUEST });
  try {
    const expense = await FirebaseAPI.createExpense(
      split,
      paid,
      description,
      users,
      currentUser,
      groupId
    );
    const total = await FirebaseAPI.fetchUserTotal(currentUser, groupId);
    await dispatch({
      type: CREATED_EXPENSE_SUCCESS,
      payload: { total, expense }
    });
    await dispatch(fetchUsersTotal(users, groupId));
  } catch (error) {
    console.error(error);
    dispatch({ type: CREATED_EXPENSE_ERROR, payload: error });
  }
};

export const deleteExpense = (users, expense, groupId) => async dispatch => {
  dispatch({ type: EXPENSE_REQUEST });
  try {
    await FirebaseAPI.deleteExpense(users, expense.id, groupId);
    dispatch({ type: EXPENSE_DELETED, payload: expense.id });
  } catch (error) {
    console.error(error);
    dispatch({ type: EXPENSE_ERROR, payload: error });
  }
};
