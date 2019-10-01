function Paid({ user, group, expense }) {
  const renderPaid = ({ payerId, totalAmount }) => {
    const payer = group.users.find(user => user.id === payerId);
    return payer.id === user.uid
      ? `You paid $${totalAmount}`
      : `${payer.name} paid $${totalAmount}`;
  };

  return renderPaid(expense);
}

export default Paid;
