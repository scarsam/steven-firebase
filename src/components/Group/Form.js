import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { Formik, Form, FieldArray } from 'formik';
import GroupAmount from './Amount';
import GroupAmounts from './Amounts';
import GroupRadioButtons from './RadioButtons';
import GroupDescription from './Description';
import { createExpense } from '../../store/actions/expenseActions';

function ExpenseForm({ group, user, groupId, setExpenseModal }) {
  const dispatch = useDispatch();

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add an expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Formik
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
                  createExpense(split, paid, description, users, user, groupId)
                );
                setExpenseModal(false);
                resetForm();
              }}
              render={({ values }) => (
                <Form className='col'>
                  <GroupRadioButtons values={values} />
                  <GroupDescription />
                  {values.split === 'true' ? (
                    <GroupAmount />
                  ) : (
                    <FieldArray
                      name='users'
                      render={() =>
                        values.users.map((user, index) => (
                          <GroupAmounts key={index} user={user} index={index} />
                        ))
                      }
                    />
                  )}
                  <Button type='submit' variant='primary' block>
                    Submit
                  </Button>
                </Form>
              )}
            />
          </Row>
        </Container>
      </Modal.Body>
    </>
  );
}

export default ExpenseForm;
