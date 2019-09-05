import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, FieldArray } from 'formik';
import Modal from 'react-modal';
import CopyClipboard from './CopyClipboard';
import { fetchGroup } from '../store/actions/groupActions';
import { fetchExpenses, createExpense } from '../store/actions/expenseActions';
import Box from './styles/Box';
import { CloseButton, RoundButton } from './styles/Buttons';

const radioButtons = [
  {
    label: 'Split evenly',
    value: 'true'
  },
  {
    label: "Don't split",
    value: 'false'
  }
];

function Group(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

  const toggleModal = () => setModalIsOpen(toggleModal => !toggleModal);

  const renderExpense = ({ payerId, amount }) => {
    return payerId === user.uid
      ? `You lent ${amount}`
      : `You borrowed ${amount}`;
  };

  const renderPaid = ({ payerId, totalAmount }) => {
    const payer = group.users.find(user => user.id === payerId);
    return payer.id === user.uid
      ? `You paid ${totalAmount}`
      : `${payer.name} paid ${totalAmount}`;
  };

  return (
    group && (
      <>
        <Box isLoading={pending}>
          <>
            <div className='d-flex align-items-center justify-content-between pb-3'>
              <p className='mb-0'>Group name: {group.name}</p>
              <CopyClipboard />
            </div>
            <div className='d-flex align-items-center justify-content-between border-bottom pb-3'>
              <p className='mb-0'>Your balance is: ${total}</p>
              <button className='btn btn-primary btn-sm'>Get even</button>
            </div>
            {expenses &&
              expenses.map((expense, index) => (
                <div
                  className='d-flex justify-content-between pt-3'
                  key={index}
                >
                  <p>{expense.description}</p>
                  <p>{renderPaid(expense)}</p>
                  <p>{renderExpense(expense)}</p>
                </div>
              ))}
          </>
        </Box>
        {group.users.length > 1 && (
          <div className='d-flex justify-content-center mt-2'>
            <RoundButton cb={toggleModal}>+</RoundButton>
          </div>
        )}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={toggleModal}
          contentLabel='Example Modal'
          portalClassName='Modal'
        >
          <CloseButton cb={toggleModal}>x</CloseButton>
          <h4 className='pb-3p'>Add an expense</h4>
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
              setModalIsOpen(false);
              resetForm();
            }}
            render={({ values }) => (
              <Form>
                <div class='form-group'>
                  {radioButtons.map((button, index) => (
                    <div class='form-check'>
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
                        for={index}
                        key={index}
                      >
                        {button.label}
                      </label>
                    </div>
                  ))}
                </div>
                <Field
                  placeholder='Description'
                  className='form-control mb-3'
                  type='text'
                  name='description'
                />
                {values.split === 'true' ? (
                  <>
                    <div class='form-group'>
                      <div class='input-group mb-3'>
                        <div class='input-group-prepend'>
                          <span class='input-group-text'>$</span>
                        </div>
                        <Field
                          className='form-control'
                          placeholder='Amount'
                          type='number'
                          name='paid'
                        />
                      </div>
                    </div>
                    <button type='submit' class='btn btn-block btn-primary'>
                      Submit
                    </button>
                  </>
                ) : (
                  <FieldArray
                    name='users'
                    render={() => (
                      <>
                        {values.users.map((user, index) => (
                          <div class='form-group'>
                            <div class='input-group mb-3'>
                              <div class='input-group-prepend'>
                                <span class='input-group-text'>
                                  {user.name}
                                </span>
                                <span class='input-group-text'>$</span>
                              </div>
                              <Field
                                placeholder='amount'
                                className='form-control'
                                type='number'
                                name={`users[${index}].amount`}
                              />
                            </div>
                          </div>
                        ))}
                        <button type='submit' class='btn btn-block btn-primary'>
                          Submit
                        </button>
                      </>
                    )}
                  />
                )}
              </Form>
            )}
          />
        </Modal>
      </>
    )
  );
}

export default Group;
