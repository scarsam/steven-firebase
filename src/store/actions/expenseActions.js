import { dbGetExpenses, dbCreateExpenses } from "../../firebase/helpers";
import {
  EXPENSE_REQUEST,
  EXPENSE_SUCCESS,
  EXPENSE_ERROR,
  CREATED_EXPENSE_REQUEST,
  CREATED_EXPENSE_SUCCESS,
  CREATED_EXPENSE_ERROR
} from "../types";

export const getExpenses = user => async dispatch => {
  dispatch({ type: EXPENSE_REQUEST });
  const { expenses, error } = await dbGetExpenses(user);
  if (expenses) dispatch({ type: EXPENSE_SUCCESS, payload: expenses });
  if (error) dispatch({ type: EXPENSE_ERROR, payload: error });
};

export const createExpenses = (
  radio,
  user,
  description,
  amount,
  expenseUser,
  groupId
) => async dispatch => {
  dispatch({ type: CREATED_EXPENSE_REQUEST });
  const { expenses, error } = await dbCreateExpenses(
    radio,
    user,
    description,
    amount,
    expenseUser,
    groupId
  );
  if (expenses) dispatch({ type: CREATED_EXPENSE_SUCCESS, payload: expenses });
  if (error) dispatch({ type: CREATED_EXPENSE_ERROR, payload: error });
};
