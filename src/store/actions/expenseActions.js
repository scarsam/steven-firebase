import firebase from "../../firebase";
import "firebase/firestore";
import {
  EXPENSE_REQUEST,
  EXPENSE_SUCCESS,
  EXPENSE_ERROR,
  CREATED_EXPENSE_REQUEST,
  CREATED_EXPENSE_SUCCESS,
  CREATED_EXPENSE_ERROR
} from "../types";

export const fetchExpenses = (user, groupId) => async dispatch => {
  dispatch({ type: EXPENSE_REQUEST });

  try {
    await firebase
      .firestore()
      .collection("users")
      .doc(`${user.uid}`)
      .collection("expenses")
      .doc(`${groupId}`)
      .get()
      .then(doc => {
        const expenses = doc.data().expenses;
        dispatch({ type: EXPENSE_SUCCESS, payload: expenses });
      });
  } catch (error) {
    dispatch({ type: EXPENSE_ERROR, payload: error });
  }
};

export const createExpense = (
  payee,
  user,
  description,
  amount,
  friend,
  groupId
) => async dispatch => {
  dispatch({ type: CREATED_EXPENSE_REQUEST });
  const plusOrMinus = id =>
    payee === id ? parseFloat(amount) : parseFloat(-amount);

  // Get a new write batch
  const batch = firebase.firestore().batch();

  const userExpenseRef = firebase
    .firestore()
    .collection("users")
    .doc(`${user.uid}`)
    .collection("expenses")
    .doc(`${groupId}`);
  batch.set(
    userExpenseRef,
    {
      expenses: firebase.firestore.FieldValue.arrayUnion({
        amount: plusOrMinus(user.uid),
        description,
        from: friend.label
      })
    },
    { merge: true }
  );

  const friendExpenseRef = firebase
    .firestore()
    .collection("users")
    .doc(`${friend.value}`)
    .collection("expenses")
    .doc(`${groupId}`);
  batch.set(
    friendExpenseRef,
    {
      expenses: firebase.firestore.FieldValue.arrayUnion({
        amount: plusOrMinus(friend.value),
        description,
        from: user.displayName
      })
    },
    { merge: true }
  );

  // Commit the batch
  try {
    await batch.commit();
    const expense = {
      amount: plusOrMinus(user.uid),
      description,
      from: friend.label
    };
    dispatch({ type: CREATED_EXPENSE_SUCCESS, payload: expense });
  } catch (error) {
    dispatch({ type: CREATED_EXPENSE_ERROR, payload: error });
  }
};
