import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, FieldArray } from "formik";
import styled from "styled-components";
import Modal from "react-modal";
import CopyClipboard from "./CopyClipboard";
import { fetchGroup } from "../store/actions/groupActions";
import { fetchExpenses, createExpense } from "../store/actions/expenseActions";
import Box from "./styles/Box";
import { CloseButton, AddGroupButton, ButtonWrapper } from "./styles/Buttons";
import { Width100 } from "./styles/Helpers";
import { H4 } from "./styles/Text";

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
    label: "Split evenly",
    value: "true"
  },
  {
    label: "Don't split",
    value: "false"
  }
];

function Group(props) {
  const groupId = props.match.params.groupId;
  const user = useSelector(store => store.userState.user);
  const group = useSelector(store => store.groupState.group);
  const expenses = useSelector(store => store.expenseState.expenses);
  const pending = useSelector(store => store.expenseState.pending);
  const total = useSelector(store => store.expenseState.total);
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchGroup(groupId));
    dispatch(fetchExpenses(groupId, user));
  }, []);

  const toggleModal = () => setModalIsOpen(toggleModal => !toggleModal);

  const renderExpense = ({ payerId, amount }) => {
    return payerId === user.uid
      ? `You lent ${amount}`
      : `You borrowed ${amount}`;
  };

  return (
    group && (
      <>
        <Box>
          {pending ? (
            <p>Loading</p>
          ) : (
            <>
              <TopBar>
                <p>Group name: {group.name}</p>
              </TopBar>
              <Wrapper>
                <p>Your balance is: ${total}</p>
                <button>Get even</button>
              </Wrapper>
              <BorderBottom />
              {expenses &&
                expenses.map((expense, index) => (
                  <GroupStyles key={index}>
                    <p>{renderExpense(expense)}</p>
                    <p>{expense.description}</p>
                    <p>{expense.paid}</p>
                  </GroupStyles>
                ))}
            </>
          )}
        </Box>
        <CopyClipboard />
        <ButtonWrapper>
          <AddGroupButton cb={toggleModal} text={"+"} />
        </ButtonWrapper>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={toggleModal}
          contentLabel="Example Modal"
          portalClassName="modal"
        >
          <CloseButton cb={toggleModal} text={"x"} />
          <Width100>
            <H4 marginTop={false} text={"Add an expense"} />
            <Formik
              enableReinitialize={true}
              initialValues={{
                description: "",
                split: "true",
                paid: "",
                users: [...group.users]
              }}
              onSubmit={async (values, { resetForm }) => {
                const { split, description, paid, users } = values;
                if (split === "true") {
                  const numberOfUsers = values.users.length;
                  const expenses = values.users.map(user => ({
                    ...user,
                    amount: paid / numberOfUsers
                  }));
                  await dispatch(
                    createExpense(paid, description, expenses, user, groupId)
                  );
                } else {
                  await dispatch(
                    createExpense(paid, description, users, user, groupId)
                  );
                }
                await dispatch(fetchExpenses(groupId, user));
                setModalIsOpen(false);
                resetForm();
                // same shape as initial values
                console.log(values);
              }}
              render={({ values }) => (
                <Form name="test">
                  {radioButtons.map((button, index) => (
                    <label key={index}>
                      <Field name="split">
                        {({ field }) => (
                          <>
                            <input
                              {...field}
                              type="radio"
                              value={button.value}
                              checked={button.value === values.split}
                            />
                          </>
                        )}
                      </Field>
                      <span>{button.label}</span>
                    </label>
                  ))}
                  <Field
                    placeholder="Description"
                    type="text"
                    name="description"
                  />
                  {values.split === "true" ? (
                    <>
                      <Field placeholder="Amount" type="number" name="paid" />
                      <div>
                        <button type="submit">Submit</button>
                      </div>
                    </>
                  ) : (
                    <FieldArray
                      name="users"
                      render={() => (
                        <div>
                          {values.users.map((user, index) => (
                            <div key={index}>
                              {user.name}
                              <Field
                                placeholder="amount"
                                type="number"
                                name={`users[${index}].amount`}
                              />
                            </div>
                          ))}
                          <div>
                            <button type="submit">Submit</button>
                          </div>
                        </div>
                      )}
                    />
                  )}
                </Form>
              )}
            />
          </Width100>
        </Modal>
      </>
    )
  );
}

export default Group;
