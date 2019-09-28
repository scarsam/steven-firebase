import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import GroupAmount from './Amount';
import GroupAmounts from './Amounts';
import GroupRadioButtons from './RadioButtons';
import GroupDescription from './Description';
import { createExpense } from '../../store/actions/expenseActions';

const validationSchema = Yup.object().shape({
  split: Yup.boolean(),
  description: Yup.string().required('Description is required!'),
  paid: Yup.string().when('split', {
    is: true,
    then: Yup.string().required('Amount is required!')
  }),
  users: Yup.array().when('split', {
    is: false,
    then: Yup.array().of(
      Yup.object().shape({
        amount: Yup.string().required('Amount is required!')
      })
    )
  })
});

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
              validationSchema={validationSchema}
              onSubmit={async (values, { resetForm }) => {
                const { split, description, paid, users } = values;
                await dispatch(
                  createExpense(split, paid, description, users, user, groupId)
                );
                setExpenseModal(false);
                resetForm();
              }}
              render={({ values, errors, touched, handleChange }) => (
                <Form className='col'>
                  <GroupRadioButtons values={values} />
                  <GroupDescription
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                  />
                  {values.split === 'true' ? (
                    <GroupAmount
                      handleChange={handleChange}
                      errors={errors}
                      touched={touched}
                    />
                  ) : (
                    <FieldArray
                      name='users'
                      render={() =>
                        values.users.map((user, index) => (
                          <GroupAmounts
                            key={index}
                            user={user}
                            index={index}
                            errors={errors}
                            touched={touched}
                            handleChange={handleChange}
                          />
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
