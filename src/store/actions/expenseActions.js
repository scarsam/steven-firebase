import FirebaseAPI from '../../firebase';
import {
  EXPENSE_REQUEST,
  EXPENSE_SUCCESS,
  EXPENSE_ERROR,
  EXPENSES_SUCCESS,
  CREATED_EXPENSE_REQUEST,
  CREATED_EXPENSE_SUCCESS,
  CREATED_EXPENSE_ERROR
} from '../types';

export const fetchUsersTotal = (users, id) => async dispatch => {
  dispatch({ type: EXPENSE_REQUEST });
  try {
    const expenses = await FirebaseAPI.fetchUsersTotal(users, id);
    dispatch({ type: EXPENSES_SUCCESS, payload: expenses });
  } catch (error) {
    console.log(error);
    dispatch({ type: EXPENSE_ERROR, payload: error });
  }
};

export const fetchUserExpenses = (user, id) => async dispatch => {
  dispatch({ type: EXPENSE_REQUEST });
  try {
    const expenses = await FirebaseAPI.fetchUserExpenses(user, id);
    //
    // Break this up into separate action
    //
    const total = await FirebaseAPI.fetchUserTotal(user, id);
    dispatch({ type: EXPENSE_SUCCESS, payload: expenses, total });
  } catch (error) {
    console.log(error);
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
    dispatch({ type: CREATED_EXPENSE_ERROR, payload: error });
  }
};
