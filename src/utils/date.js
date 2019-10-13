const printDate = created => {
  const date = new Date(created);
  return `${date.getDate()}/${date.getMonth()}`;
};

export default printDate;
