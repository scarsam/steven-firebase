import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { fetchGroup } from '../store/actions/groupActions';
import {
  fetchUserExpenses,
  fetchUserTotal
} from '../store/actions/expenseActions';
import Box from '../layouts/Box';
import ExpenseForm from '../components/Expenses/Form/Form';
import GetEven from '../components/Expenses/GetEven';
import GroupHeader from '../components/Expenses/Header';
import Paid from '../components/Expenses/Paid';
import Expense from '../components/Expenses/Expense';

function Expenses(props) {
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
          <>
            <GroupHeader
              group={group}
              total={total}
              expenses={expenses}
              toggleExpenseModal={toggleExpenseModal}
            />
            {group.users.length > 1 ? (
              <Table responsive>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Paid</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense, index) => (
                    <tr key={index}>
                      <td>{expense.description}</td>
                      <td>
                        <Paid user={user} group={group} expense={expense} />
                      </td>
                      <td>
                        <Expense user={user} group={group} expense={expense} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Alert variant='info'>
                <h5>Invite your friends</h5>
                <p>
                  Before you can add expenses, use the{' '}
                  <strong>copy invite link</strong> in the top right corner to
                  invite your friends
                </p>
              </Alert>
            )}
          </>
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
            size='md'
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

export default Expenses;
