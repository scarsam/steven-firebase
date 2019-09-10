import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { fetchAllExpenses } from '../../store/actions/expenseActions';

function GetEven({ groupId, group }) {
  const dispatch = useDispatch();
  const totalExpenses = useSelector(store => store.expenseState.totalExpenses);

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

    while (i < j) {
      debt = Math.min(-sortedValuesPaid[i], sortedValuesPaid[j]);
      sortedValuesPaid[i] += debt;
      sortedValuesPaid[j] -= debt;

      console.log(`${sortedPeople[i]} owes ${sortedPeople[j]} $${debt}`);

      if (sortedValuesPaid[i] === 0) {
        i++;
      }

      if (sortedValuesPaid[j] === 0) {
        j--;
      }
    }
  };

  useEffect(() => {
    dispatch(fetchAllExpenses(groupId, group.users));
  }, [groupId, group.users, dispatch]);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Get even</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>{splitPayments(totalExpenses)}</Row>
        </Container>
      </Modal.Body>
    </>
  );
}

export default GetEven;
