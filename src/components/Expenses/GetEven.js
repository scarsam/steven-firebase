import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

function GetEven({ totalExpenses }) {
  const splitPayments = payments => {
    const sum = payments.reduce((acc, user) => acc + user.total, 0);
    const mean = sum / payments.length;

    const sortedPayments = payments.sort(
      (personA, personB) => personA.total - personB.total
    );
    const sortedPaid = sortedPayments.map(person => ({
      ...person,
      total: person.total - mean
    }));

    let i = 0;
    let j = sortedPaid.length - 1;
    let debt;
    let debts = [];

    while (i < j) {
      debt = Math.min(-sortedPaid[i].total, sortedPaid[j].total);

      sortedPaid[i].total += debt;
      sortedPaid[j].total -= debt;

      debts.push({
        payer: sortedPaid[i].name,
        payee: sortedPaid[j].name,
        debt: parseFloat(parseFloat(debt).toFixed(2))
      });

      if (sortedPaid[i].total === 0) {
        i++;
      }

      if (sortedPaid[j].total === 0) {
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
            {splitPayments(totalExpenses).map((debt, index) => (
              <p key={index}>
                {debt.payer} owes {debt.payee} ${debt.debt}
              </p>
            ))}
          </Row>
        </Container>
      </Modal.Body>
    </>
  );
}

export default GetEven;
