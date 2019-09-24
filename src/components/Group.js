import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { fetchGroup } from '../store/actions/groupActions';
import {
  fetchUserExpenses,
  fetchUserTotal
} from '../store/actions/expenseActions';
import Box from './styles/Box';
import GroupExpenses from './Group/Expenses';
import GroupHeader from './Group/Header';
import ExpenseForm from './Group/Form';
import GetEven from './Group/GetEven';

function Group(props) {
  const [expenseModal, setExpenseModal] = useState(false);
  const [getEvenModal, setGetEvenModal] = useState(false);
  const groupId = props.match.params.groupId;
  const user = useSelector(store => store.userState.user);
  const group = useSelector(store => store.groupState.group);
  const pending = useSelector(store => store.expenseState.pending);
  const total = useSelector(store => store.expenseState.total);
  const expenses = useSelector(store => store.expenseState.expenses);
  const totalExpenses = useSelector(store => store.expenseState.totalExpenses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroup(groupId));
    dispatch(fetchUserExpenses(user, groupId));
    dispatch(fetchUserTotal(user, groupId));
  }, [groupId, dispatch, user]);

  const toggleFormModal = () => setExpenseModal(currentValue => !currentValue);
  const toggleExpenseModal = async () =>
    setGetEvenModal(currentValue => !currentValue);

  return (
    group && (
      <>
        <Box isLoading={pending}>
          <GroupHeader
            group={group}
            total={total}
            expenses={expenses}
            toggleExpenseModal={toggleExpenseModal}
          />
          <GroupExpenses group={group} user={user} expenses={expenses} />
        </Box>
        {group.users.length >= 2 && (
          <Row className='mt-4 text-center'>
            <Col>
              <Button variant='primary' onClick={toggleFormModal}>
                Add expense
              </Button>
            </Col>
          </Row>
        )}
        <>
          <Modal
            show={expenseModal}
            size='sm'
            onHide={toggleFormModal}
            centered
          >
            <ExpenseForm
              group={group}
              user={user}
              groupId={groupId}
              setExpenseModal={setExpenseModal}
            />
          </Modal>
          <Modal
            show={getEvenModal}
            size='sm'
            onHide={toggleExpenseModal}
            centered
          >
            <GetEven totalExpenses={totalExpenses} />
          </Modal>
        </>
      </>
    )
  );
}

export default Group;
