import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useDispatch } from 'react-redux';
import { Formik, FieldArray } from 'formik';
import GroupAmount from './Amount';
import GroupAmounts from './Amounts';
import GroupSubmit from './Submit';
import GroupRadioButtons from './RadioButtons';
import GroupDescription from './Description';
import {
  fetchExpenses,
  createExpense
} from '../../store/actions/expenseActions';

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
                  createExpense(split, paid, description, users, user, groupId)
                );
                await dispatch(fetchExpenses(groupId, user));
                setExpenseModal(false);
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
    </>
  );
}

export default ExpenseForm;
