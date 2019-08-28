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

export const fetchExpenses = (groupId, user) => async dispatch => {
  dispatch({ type: EXPENSE_REQUEST });
  try {
    let expenses;
    let total;
    let baseRef = firebase
      .firestore()
      .collection("groups")
      .doc(`${groupId}`)
      .collection("users")
      .doc(`${user.uid}`)
      .collection("expenses");
    await baseRef
      .orderBy("created", "desc")
      .get()
      .then(querySnapshot => {
        expenses = querySnapshot.docs
          .map(doc => {
            return { ...doc.data(), id: doc.id };
          })
          .filter(doc => doc.id !== "--stats--");
      });
    await baseRef
      .doc("--stats--")
      .get()
      .then(doc => {
        total = doc.data().total;
      });
    dispatch({ type: EXPENSE_SUCCESS, payload: expenses, total });
  } catch (error) {
    console.log(error);
    dispatch({ type: EXPENSE_ERROR, payload: error });
  }
};

export const createExpense = (
  paid,
  description,
  expenseGroup,
  currentUser,
  groupId
) => async dispatch => {
  const userAmount = (userId, amount) => {
    return userId === currentUser.uid
      ? parseFloat(parseFloat(amount).toFixed(2))
      : -parseFloat(parseFloat(amount).toFixed(2));
  };

  dispatch({ type: CREATED_EXPENSE_REQUEST });
  try {
    let newExpense;
    let newExpenseRef;
    let increment;
    let totalRef;
    let total;

    const batch = firebase.firestore().batch();
    expenseGroup
      .filter(user => user.amount !== "")
      .forEach(async user => {
        let baseRef = firebase
          .firestore()
          .collection("groups")
          .doc(`${groupId}`)
          .collection("users")
          .doc(`${user.id}`)
          .collection("expenses");
        increment = firebase.firestore.FieldValue.increment(
          userAmount(user.id, user.amount)
        );
        totalRef = baseRef.doc("--stats--");
        newExpenseRef = baseRef.doc();
        newExpense = {
          description,
          payerId: currentUser.uid,
          paid: user.id === currentUser.uid ? paid : 0,
          amount: userAmount(user.id, user.amount),
          created: Date.now()
        };
        batch.set(newExpenseRef, { ...newExpense });
        await totalRef.set({ total: increment }, { merge: true });
      });

    await totalRef.get().then(doc => {
      total = doc.data().total;
    });

    await batch.commit();
    dispatch({ type: CREATED_EXPENSE_SUCCESS, payload: total });
  } catch (error) {
    console.log(error);
    dispatch({ type: CREATED_EXPENSE_ERROR, payload: error });
  }
};
