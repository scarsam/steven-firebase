import React from "react";
import styled from "styled-components";
import Modal from "react-modal";
import CopyClipboard from "./CopyClipboard";
import { connect } from "react-redux";
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

function Group({
  fetchGroup,
  fetchExpenses,
  createExpense,
  group,
  user,
  expenses,
  ...rest
}) {
  const groupId = rest.match.params.groupId;
  const [description, setDescription] = React.useState("");
  const [splitAmount, setSplitAmount] = React.useState([]);
  const [equalAmount, setEqualAmount] = React.useState("");
  const [friends, setFriends] = React.useState("");
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [split, setSplit] = React.useState("equal");

  React.useEffect(() => {
    fetchGroup(groupId);
    fetchExpenses(user, groupId);
    setDefaultProps(user);
  }, [JSON.stringify(group)]); // Hack to deep compare the object inside the comparission array.

  const isEnabled =
    description.length > 0 && equalAmount.length > 0 && friends.length > 0;

  const submit = async event => {
    debugger;
    event.preventDefault();
    setSplitAmount("");
    setEqualAmount("");
    setDescription("");
    setFriends("");
    setModalIsOpen(false);

    createExpense("split", user, description, equalAmount, friends, groupId);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const totalExpenses = () => {
    const totalAmount = expenses.reduce((accumlator, currentValue) => {
      return accumlator + currentValue.amount;
    }, 0);
    return totalAmount;
  };

  const friendsList = currentUser => {
    const usersAndOwners = [...group.users, group.owner];
    const withOutCurrentUser = usersAndOwners.filter(
      user => user.id !== currentUser.uid
    );
    return withOutCurrentUser;
  };

  const setDefaultProps = currentUser => {
    if (group) {
      const usersAndOwners = [...group.users, group.owner];
      const friends = usersAndOwners.filter(
        user => user.id !== currentUser.uid
      );
      const amountFriends = friends.map(friend => {
        return {
          id: friend.id,
          name: friend.name,
          amount: ""
        };
      });
      setSplitAmount([...amountFriends]);
    }
  };

  const setFriend = (event, friend) => {
    const amount = event.target.value;
    setSplitAmount(
      splitAmount.map(obj => (obj.id === friend.id ? { ...obj, amount } : obj))
    );
  };

  return (
    group && (
      <>
        <Box>
          <TopBar>
            <p>Group name: {group.name}</p>
          </TopBar>
          <Wrapper>
            <p>Your balance is: ${totalExpenses()}</p>
            <button>Get even</button>
          </Wrapper>
          <BorderBottom />
          {expenses &&
            expenses.map((expense, index) => (
              <GroupStyles key={index}>
                <p>{expense.from}</p>
                <p>{expense.description}</p>
                <p>${expense.amount}</p>
              </GroupStyles>
            ))}
        </Box>
        <CopyClipboard />
        <ButtonWrapper>
          <AddGroupButton cb={openModal} text={"+"} />
        </ButtonWrapper>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          portalClassName="modal"
        >
          <CloseButton cb={closeModal} text={"x"} />
          <Width100>
            <H4 marginTop={false} text={"Add an expense"} />
            <GroupForm cb={submit}>
              <label>
                <input
                  type="radio"
                  value="equal"
                  checked={split === "equal"}
                  onChange={event => setSplit(event.target.value)}
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
                    value={equalAmount}
                    onChange={event => setEqualAmount(event.target.value)}
                  />
                </label>
              ) : (
                friendsList(user).map(friend => (
                  <label>
                    {friend.name}
                    <input
                      type="number"
                      name="amount"
                      placeholder="Amount"
                      value={
                        splitAmount.find(amount => amount.id === friend.id)
                          .amount
                      }
                      onChange={event => setFriend(event, friend)}
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

const mapDispatchToProps = dispatch => ({
  fetchGroup: id => dispatch(fetchGroup(id)),
  fetchExpenses: (user, groupId) => dispatch(fetchExpenses(user, groupId)),
  createExpense: (split, user, description, amount, friend, groupId) =>
    dispatch(createExpense(split, user, description, amount, friend, groupId))
});

const mapStateToProps = state => ({
  user: state.userState.user,
  group: state.groupState.group,
  expenses: state.expenseState.expenses
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Group);
