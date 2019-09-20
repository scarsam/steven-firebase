export const amountsCalculator = (split, paid, users, currentUser) => {
  let userAmounts;
  let totalAmount;

  if (split === 'true') {
    totalAmount = paid;
    userAmounts = users.map(user => ({
      ...user,
      amount:
        user.id === currentUser.uid
          ? (totalAmount / users.length) * (users.length - 1)
          : totalAmount / users.length
    }));
  } else {
    totalAmount = users.reduce((total, user) => total + user.amount, 0);
    userAmounts = users.map(user => ({
      ...user,
      amount:
        user.id === currentUser.uid ? totalAmount - user.amount : user.amount
    }));
  }
  return { totalAmount, userAmounts };
};
