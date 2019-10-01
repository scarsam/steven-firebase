import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

function GetEven({ totalExpenses }) {
  const splitPayments = payments => {
    const people = Object.keys(payments);
    const valuesPaid = Object.values(payments);

    const sum = valuesPaid.reduce((acc, curr) => curr + acc);
    const mean = sum / people.length;

    const sortedPeople = people.sort(
      (personA, personB) => payments[personA] - payments[personB]
    );

    const sortedValuesPaid = sortedPeople.map(
      person => payments[person] - mean
    );

    let i = 0;
    let j = sortedPeople.length - 1;
    let debt;
    let debts = [];

    while (i < j) {
      debt = Math.min(-sortedValuesPaid[i], sortedValuesPaid[j]);
      sortedValuesPaid[i] += debt;
      sortedValuesPaid[j] -= debt;

      console.log(`${sortedPeople[i]} owes ${sortedPeople[j]} $${debt}`);

      debts.push({
        [sortedPeople[i]]: [
          { [sortedPeople[j]]: parseFloat(parseFloat(debt).toFixed(2)) }
        ]
      });

      if (sortedValuesPaid[i] === 0) {
        i++;
      }

      if (sortedValuesPaid[j] === 0) {
        j--;
      }
    }
    return debts;
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Get even</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            {splitPayments(totalExpenses).map(debt => (
              <p>
                {Object.keys(debt)} owes{' '}
                {Object.values(debt).map(expense =>
                  expense.map(
                    result =>
                      `${Object.keys(result)} - ${Object.values(result)}`
                  )
                )}
              </p>
            ))}
          </Row>
        </Container>
      </Modal.Body>
    </>
  );
}

export default GetEven;
