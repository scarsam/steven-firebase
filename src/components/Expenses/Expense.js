function Expense({ user, expense }) {
  const renderExpense = ({ payerId, amount }) => {
    return payerId === user.uid ? `You lent $${amount}` : `You owe $${amount}`;
  };

  return renderExpense(expense);
}

export default Expense;
