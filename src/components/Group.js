import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, FieldArray } from 'formik';
import Table from 'react-bootstrap/Table';
import { Group as FormGroup } from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import CopyClipboard from './CopyClipboard';
import { fetchGroup } from '../store/actions/groupActions';
import { fetchExpenses, createExpense } from '../store/actions/expenseActions';
import Box from './styles/Box';

const radioButtons = [
  {
    label: 'Split evenly',
    value: 'true'
  },
  {
    label: 'Specific amount',
    value: 'false'
  }
];

function Group(props) {
  const [show, setShow] = useState(false);
  const groupId = props.match.params.groupId;
  const user = useSelector(store => store.userState.user);
  const group = useSelector(store => store.groupState.group);
  const expenses = useSelector(store => store.expenseState.expenses);
  const pending = useSelector(store => store.expenseState.pending);
  const total = useSelector(store => store.expenseState.total);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroup(groupId));
    dispatch(fetchExpenses(groupId, user));
  }, [groupId, dispatch, user]);

  const renderExpense = ({ payerId, amount }) => {
    return payerId === user.uid
      ? `You lent $${amount}`
      : `You borrowed $${amount}`;
  };

  const renderPaid = ({ payerId, totalAmount }) => {
    const payer = group.users.find(user => user.id === payerId);
    return payer.id === user.uid
      ? `You paid $${totalAmount}`
      : `${payer.name} paid $${totalAmount}`;
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    group && (
      <>
        <Box isLoading={pending}>
          <>
            <Row>
              <Col className='align-self-center'>Group name: {group.name}</Col>
              <Col className='text-right'>
                <CopyClipboard />
              </Col>
            </Row>
            <Row className='mt-2 mb-3 pb-3'>
              <Col className='align-self-center'>Your balance is: ${total}</Col>
              <Col className='text-right'>
                <Button variant='primary' size='sm'>
                  Get even
                </Button>
              </Col>
            </Row>
            <Table responsive>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Paid</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses &&
                  expenses.map((expense, index) => (
                    <tr key={index}>
                      <td>{expense.description}</td>
                      <td>{renderPaid(expense)}</td>
                      <td>{renderExpense(expense)}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </>
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
                        <FormGroup>
                          {radioButtons.map((button, index) => (
                            <div className='form-check' key={index}>
                              <Field name='split'>
                                {({ field }) => (
                                  <input
                                    {...field}
                                    type='radio'
                                    id={index}
                                    value={button.value}
                                    className='form-check-input'
                                    checked={button.value === values.split}
                                  />
                                )}
                              </Field>
                              <label
                                className='class="form-check-label'
                                htmlFor={index}
                                key={index}
                              >
                                {button.label}
                              </label>
                            </div>
                          ))}
                        </FormGroup>
                        <Field
                          placeholder='Description'
                          className='form-control mb-3'
                          type='text'
                          name='description'
                        />
                        {values.split === 'true' ? (
                          <>
                            <FormGroup>
                              <InputGroup className='mb-3'>
                                <InputGroup.Prepend>
                                  <InputGroup.Text>$</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Field
                                  className='form-control'
                                  placeholder='Amount'
                                  type='number'
                                  name='paid'
                                />
                              </InputGroup>
                            </FormGroup>
                            <Button type='submit' variant='primary' block>
                              Submit Expense
                            </Button>
                          </>
                        ) : (
                          <FieldArray
                            name='users'
                            render={() => (
                              <>
                                {values.users.map((user, index) => (
                                  <FormGroup key={index}>
                                    <InputGroup>
                                      <InputGroup.Prepend>
                                        <InputGroup.Text>
                                          {user.name}
                                        </InputGroup.Text>
                                        <InputGroup.Text>$</InputGroup.Text>
                                      </InputGroup.Prepend>
                                      <Field
                                        placeholder='amount'
                                        className='form-control'
                                        type='number'
                                        name={`users[${index}].amount`}
                                      />
                                    </InputGroup>
                                  </FormGroup>
                                ))}
                                <Button type='submit' variant='primary' block>
                                  Submit Expense
                                </Button>
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
