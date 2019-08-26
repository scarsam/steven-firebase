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
    await firebase
      .firestore()
      .collection("groupExpenses")
      .doc(`${groupId}`)
      .get()
      .then(doc => {
        const filteredData = doc.data().expenses.filter(expense => {
          return expense.amounts.some(amount => amount.id === user.uid);
        });
        dispatch({ type: EXPENSE_SUCCESS, payload: filteredData });
      });
  } catch (error) {
    console.log(error);
    dispatch({ type: EXPENSE_ERROR, payload: error });
  }
};

// Test strucutre expenses like this groupId > userId
// groupId > userId: {
//   id,
//   description,
//   total,
//   expenses: []
// }

export const createExpense = (
  split,
  user,
  description,
  expenseGroup,
  groupId
) => async dispatch => {
  let group = expenseGroup.map(expense => ({
    ...expense,
    amount: expense.amount === "" ? "0" : expense.amount
  }));

  const isCurrentUser = user => {
    return currentUser().id === user.id;
  };
  const currentUser = () =>
    group.find(currentUser => currentUser.id === user.uid);

  const totalAmount = () => {
    const totalAmount = group.reduce((accumlator, currentValue) => {
      return accumlator + parseFloat(currentValue.amount);
    }, 0);
    return split === "equal" ? totalAmount / group.length : totalAmount;
  };

  const payees = () => {
    if (split === "equal") {
      return group.map(expense => ({
        ...expense,
        amount: isCurrentUser(expense)
          ? parseFloat(parseFloat(expense.amount / group.length).toFixed(2))
          : -parseFloat(parseFloat(expense.amount / group.length).toFixed(2))
      }));
    } else {
      return group.map(expense => ({
        ...expense,
        amount: isCurrentUser(expense)
          ? parseFloat(parseFloat(expense.amount).toFixed(2))
          : -parseFloat(parseFloat(expense.amount).toFixed(2))
      }));
    }
  };

  const payer = currentUser();
  const newExpense = {
    description,
    total: totalAmount(),
    payerId: payer.id,
    amounts: payees()
  };

  dispatch({ type: CREATED_EXPENSE_REQUEST });

  try {
    await firebase
      .firestore()
      .collection("groupExpenses")
      .doc(`${groupId}`)
      .get()
      .then(doc => {
        doc.ref.set(
          {
            expenses: firebase.firestore.FieldValue.arrayUnion(newExpense)
          },
          { merge: true }
        );
      });
    dispatch({ type: CREATED_EXPENSE_SUCCESS, payload: newExpense });
  } catch (error) {
    dispatch({ type: CREATED_EXPENSE_ERROR, payload: error });
  }
};
