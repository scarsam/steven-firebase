import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const [description, setDescription] = useState("");
  const [expenseGroup, setExpenseGroup] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [split, setSplit] = useState("equal");
  const user = useSelector(store => store.userState.user);
  const group = useSelector(store => store.groupState.group);
  const expenses = useSelector(store => store.expenseState.expenses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroup(groupId));
    dispatch(fetchExpenses(groupId, user));
    setAmountDefaultProps(user);
  }, [JSON.stringify(group)]); // Hack to deep compare the object inside the comparission array.

  // const isEnabled =
  //   description.length > 0 && equalAmount.length > 0 && friends.length > 0;

  const submit = async event => {
    event.preventDefault();
    dispatch(createExpense(split, user, description, expenseGroup, groupId));
    setDescription("");
    setModalIsOpen(false);
    setAmountDefaultProps();
  };

  const toggleModal = () => setModalIsOpen(toggleModal => !toggleModal);

  const totalBalance = () => {
    let expenseTotal;
    const total = expenses.reduce((totalAccumlator, group) => {
      if (group.payerId === user.uid) {
        expenseTotal = group.amounts.reduce((expenseAccumlator, expense) => {
          return expense.id !== user.uid
            ? expenseAccumlator - expense.amount
            : expenseAccumlator;
        }, 0);
      } else {
        expenseTotal = group.amounts.reduce((expenseAccumlator, expense) => {
          return expense.id === user.uid
            ? expenseAccumlator + expense.amount
            : expenseAccumlator;
        }, 0);
      }
      return totalAccumlator + expenseTotal;
    }, 0);
    return total;
  };

  const totalLentOrBorrowed = ({ amounts, total, payerId }) => {
    const payer = amounts.find(payer => payer.id === user.uid);
    if (!payer) return;
    if (payer.id === payerId) {
      return renderExpense(true, total - payer.amount);
    } else {
      return renderExpense(false, payer.amount);
    }
  };

  const renderExpense = (lent, amount) =>
    lent ? `You lent ${amount}` : `You borrowed ${amount}`;

  const friendsList = () => {
    const friends = [group.owner, ...group.users];
    return friends;
  };

  // const expenseList = () => {
  //   expenses.filter(expense => expense.)
  // }

  const renderTotal = ({ amounts, total, payerId }) => {
    const payer = amounts.find(payer => payer.id === payerId);
    return user.uid === payerId
      ? `You paid ${total}`
      : `${payer.name} paid ${total}`;
  };

  const setAmountDefaultProps = () => {
    if (group) {
      const amountInputProps = friendsList().map(friend => {
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

  console.log({ group });
  console.log({ expenseGroup });
  return (
    group &&
    expenseGroup.length >= 1 && (
      <>
        <Box>
          <TopBar>
            <p>Group name: {group.name}</p>
          </TopBar>
          <Wrapper>
            <p>Your balance is: ${totalBalance()}</p>
            <button>Get even</button>
          </Wrapper>
          <BorderBottom />
          {expenses &&
            expenses.map((expense, index) => (
              <GroupStyles key={index}>
                <p>{renderTotal(expense)}</p>
                <p>{expense.description}</p>
                <p>{totalLentOrBorrowed(expense)}</p>
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
            <H4 marginTop={false} text={"Add an expense"} />
            <GroupForm cb={submit}>
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
                friendsList().map(friend => (
                  <label>
                    {friend.name}
                    <input
                      type="number"
                      name="amount"
                      placeholder="Amount"
                      value={
                        expenseGroup.find(
                          expenseUser => expenseUser.id === friend.id
                        ).amount
                      }
                      onChange={event =>
                        setExpenseGroup(
                          expenseGroup.map(obj =>
                            obj.id === friend.id
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
            </GroupForm>
          </Width100>
        </Modal>
      </>
    )
  );
}

export default Group;
