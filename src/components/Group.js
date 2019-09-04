import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, FieldArray } from 'formik';
import styled from 'styled-components';
import Modal from 'react-modal';
import CopyClipboard from './CopyClipboard';
import { fetchGroup } from '../store/actions/groupActions';
import { fetchExpenses, createExpense } from '../store/actions/expenseActions';
import Box from './styles/Box';
import { CloseButton, RoundButton } from './styles/Buttons';
import { H4 } from './styles/Text';

const GroupStyles = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  input {
    position: absolute;
  }
`;

const BorderBottom = styled.div`
  border-bottom: 1px solid black;
`;

const Wrapper = styled.div`
  align-items: center;
  justify-content: space-between;
  display: flex;
`;

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
        <Box>
          <>
            <TopBar>
              <p>Group name: {group.name}</p>
              <CopyClipboard />
            </TopBar>
            <Wrapper>
              <p>Your balance is: ${total}</p>
              <button>Get even</button>
            </Wrapper>
            <BorderBottom />
            {expenses &&
              expenses.map((expense, index) => (
                <GroupStyles key={index}>
                  <p>{expense.description}</p>
                  <p>{renderPaid(expense)}</p>
                  <p>{renderExpense(expense)}</p>
                </GroupStyles>
              ))}
          </>
        </Box>
        <RoundButton cb={toggleModal}>+</RoundButton>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={toggleModal}
          contentLabel='Example Modal'
          portalClassName='modal'
        >
          <CloseButton cb={toggleModal}>x</CloseButton>
          <H4 marginTop={false} text={'Add an expense'} />
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
                {radioButtons.map((button, index) => (
                  <label key={index}>
                    <Field name='split'>
                      {({ field }) => (
                        <input
                          {...field}
                          type='radio'
                          value={button.value}
                          checked={button.value === values.split}
                        />
                      )}
                    </Field>
                    {button.label}
                  </label>
                ))}
                <Field
                  placeholder='Description'
                  type='text'
                  name='description'
                />
                {values.split === 'true' ? (
                  <>
                    <Field placeholder='Amount' type='number' name='paid' />
                    <button type='submit'>Submit</button>
                  </>
                ) : (
                  <FieldArray
                    name='users'
                    render={() => (
                      <div>
                        {values.users.map((user, index) => (
                          <div key={index}>
                            {user.name}
                            <Field
                              placeholder='amount'
                              type='number'
                              name={`users[${index}].amount`}
                            />
                          </div>
                        ))}
                        <button type='submit'>Submit</button>
                      </div>
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
