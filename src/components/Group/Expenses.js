import React from 'react';
import Table from 'react-bootstrap/Table';

function GroupExpenses({ user, group, expenses }) {
  const renderExpense = ({ payerId, amount }) => {
    return payerId === user.uid
      ? `You lent $${amount}`
      : `You borrowed $${amount}`;
  };

  const renderPaid = ({ payerId, totalAmount }) => {
    const payer = group.users.find(user => user.id === payerId);
    return payer.id === user.uid
      ? `You paid $${totalAmount}`
      : `${payer.name} paid $${totalAmount}`;
  };

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Description</th>
          <th>Paid</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {expenses &&
          expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.description}</td>
              <td>{renderPaid(expense)}</td>
              <td>{renderExpense(expense)}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}

export default GroupExpenses;
