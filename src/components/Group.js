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
import { GroupForm } from "./styles/Form";
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

function Group(props) {
  const groupId = props.match.params.groupId;
  const user = useSelector(store => store.userState.user);
  const group = useSelector(store => store.groupState.group);
  const expenses = useSelector(store => store.expenseState.expenses);
  const total = useSelector(store => store.expenseState.total);
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [expenseGroup, setExpenseGroup] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [split, setSplit] = useState("equal");

  useEffect(() => {
    dispatch(fetchGroup(groupId));
    dispatch(fetchExpenses(groupId, user));
    setExpenseProps(group);
  }, [JSON.stringify(group)]); // Hack to deep compare the object inside the comparission array.

  // const isEnabled =
  //   description.length > 0 && equalAmount.length > 0 && friends.length > 0;

  const setExpenseProps = () => {
    if (group) {
      setExpenseGroup(group.users);
    }
  };

  const submit = async event => {
    event.preventDefault();
    dispatch(createExpense(split, user, description, expenseGroup, groupId));
    setDescription("");
    setModalIsOpen(false);
    dispatch(fetchExpenses(groupId, user));
  };

  const toggleModal = () => setModalIsOpen(toggleModal => !toggleModal);

  const renderExpense = ({ payerId, amount }) => {
    return payerId === user.uid
      ? `You lent ${amount}`
      : `You borrowed ${amount}`;
  };

  const setAmountDefaultProps = () => {
    if (group) {
      const amountInputProps = group.users.map(friend => {
        return {
          id: friend.id,
          name: friend.name,
          amount: ""
        };
      });
      setExpenseGroup([...amountInputProps]);
    }
  };

  const resetAmount = event => {
    setSplit(event.target.value);
    setAmountDefaultProps();
  };

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

  return (
    group &&
    expenseGroup.length > 1 && (
      <>
        <Box>
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
                {/* <p>{totalLentOrBorrowed(expense)}</p> */}
              </GroupStyles>
            ))}
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
            {/* <H4 marginTop={false} text={"Add an expense"} /> */}
            <Formik
              initialValues={{
                split: "true",
                amount: "",
                users: [...group.users]
              }}
              onSubmit={values => {
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
                  {values.split === "true" ? (
                    <Field placeholder="amount" type="number" name="amount" />
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
            {/* <GroupForm cb={submit}>
              <label>
                <input
                  type="radio"
                  value="equal"
                  checked={split === "equal"}
                  onChange={event => resetAmount(event)}
                />
                Split equally between everyone
              </label>
              <label>
                <input
                  type="radio"
                  value="unEqual"
                  checked={split === "unEqual"}
                  onChange={event => setSplit(event.target.value)}
                />
                Split differently
              </label>
              {split === "equal" ? (
                <label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={
                      expenseGroup.find(
                        expenseUser => expenseUser.id === group.owner.id
                      ).amount
                    }
                    onChange={event =>
                      setExpenseGroup(
                        expenseGroup.map(obj => ({
                          ...obj,
                          amount: event.target.value
                        }))
                      )
                    }
                  />
                </label>
              ) : (
                group.users.map(user => (
                  <label>
                    {user.name}
                    <input
                      type="number"
                      name="amount"
                      placeholder="Amount"
                      value={
                        expenseGroup.find(
                          expenseUser => expenseUser.id === user.id
                        ).amount
                      }
                      onChange={event =>
                        setExpenseGroup(
                          expenseGroup.map(obj =>
                            obj.id === user.id
                              ? { ...obj, amount: event.target.value }
                              : obj
                          )
                        )
                      }
                    />
                  </label>
                ))
              )}

              <input
                type="text"
                name="description"
                placeholder="Description"
                value={description}
                onChange={event => setDescription(event.target.value)}
              />

              <button type="submit">Submit</button>
            </GroupForm> */}
          </Width100>
        </Modal>
      </>
    )
  );
}

export default Group;
