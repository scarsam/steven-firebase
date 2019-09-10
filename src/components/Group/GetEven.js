import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { fetchAllExpenses } from '../../store/actions/expenseActions';

function GetEven({ groupId, group }) {
  const dispatch = useDispatch();
  const totalExpenses = useSelector(store => store.expenseState.totalExpenses);

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
          {totalExpenses.map(expense => (
            <Row>
              <p>
                {expense.name} - {expense.total}
              </p>
            </Row>
          ))}
        </Container>
      </Modal.Body>
    </>
  );
}

export default GetEven;
