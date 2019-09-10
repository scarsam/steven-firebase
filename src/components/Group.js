import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, FieldArray } from 'formik';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { fetchGroup } from '../store/actions/groupActions';
import { fetchExpenses, createExpense } from '../store/actions/expenseActions';
import Box from './styles/Box';
import GroupRadioButtons from './Group/RadioButtons';
import GroupDescription from './Group/Description';
import GroupAmount from './Group/Amount';
import GroupAmounts from './Group/Amounts';
import GroupSubmit from './Group/Submit';
import GroupExpenses from './Group/Expenses';
import GroupHeader from './Group/Header';

function Group(props) {
  const [show, setShow] = useState(false);
  const groupId = props.match.params.groupId;
  const user = useSelector(store => store.userState.user);
  const group = useSelector(store => store.groupState.group);
  const pending = useSelector(store => store.expenseState.pending);
  const total = useSelector(store => store.expenseState.total);
  const expenses = useSelector(store => store.expenseState.expenses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroup(groupId));
    dispatch(fetchExpenses(groupId, user));
  }, [groupId, dispatch, user]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    group && (
      <>
        <Box isLoading={pending}>
          <GroupHeader group={group} total={total} />
          <GroupExpenses group={group} user={user} expenses={expenses} />
        </Box>
        {group.users.length && (
          <Row className='mt-4 text-center'>
            <Col>
              <Button variant='primary' onClick={handleShow}>
                Add expense
              </Button>
            </Col>
          </Row>
        )}
        <>
          <Modal show={show} size='sm' onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add an expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row>
                  <Formik
                    enableReinitialize={true}
                    initialValues={{
                      description: '',
                      split: 'true',
                      paid: '',
                      users: group.users.map(user => ({
                        amount: '',
                        ...user
                      }))
                    }}
                    onSubmit={async (values, { resetForm }) => {
                      const { split, description, paid, users } = values;
                      await dispatch(
                        createExpense(
                          split,
                          paid,
                          description,
                          users,
                          user,
                          groupId
                        )
                      );
                      await dispatch(fetchExpenses(groupId, user));
                      setShow(false);
                      resetForm();
                    }}
                    render={({ values }) => (
                      <Form className='col'>
                        <GroupRadioButtons values={values} />
                        <GroupDescription />
                        {values.split === 'true' ? (
                          <>
                            <GroupAmount />
                            <GroupSubmit text='Submit Expense' />
                          </>
                        ) : (
                          <FieldArray
                            name='users'
                            render={() => (
                              <>
                                {values.users.map((user, index) => (
                                  <GroupAmounts user={user} index={index} />
                                ))}
                                <GroupSubmit text='Submit Expense' />
                              </>
                            )}
                          />
                        )}
                      </Form>
                    )}
                  />
                </Row>
              </Container>
            </Modal.Body>
          </Modal>
        </>
      </>
    )
  );
}

export default Group;
