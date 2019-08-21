import React from "react";
import styled from "styled-components";
import Select from "react-select";
import Modal from "react-modal";
import CopyClipboard from "./CopyClipboard";
import { connect } from "react-redux";
import { getGroup } from "../store/actions/groupActions";
import { getExpenses, createExpenses } from "../store/actions/expenseActions";
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
  const {
    getGroup,
    getExpenses,
    createExpenses,
    group,
    user,
    expenses,
    pending
  } = props;
  const groupId = props.match.params.groupId;
  const [description, setDescription] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [payee, setPayee] = React.useState("");
  const [friend, setFriend] = React.useState("");
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  React.useEffect(() => {
    getGroup(groupId);
    getExpenses(user);
  }, []);

  const isEnabled =
    description.length > 0 &&
    amount.length > 0 &&
    payee.length > 0 &&
    friend.label.length > 0;

  const submit = async event => {
    event.preventDefault();
    setAmount("");
    setDescription("");
    setFriend("");
    setPayee("");
    setModalIsOpen(false);

    createExpenses(payee, user, description, amount, friend, groupId);
  };

  const users = currentUser => {
    const usersArray = group.users.map(user => ({
      label: user.name,
      value: user.id
    }));
    const ownersArray = [
      {
        label: group.owner.name,
        value: group.owner.id
      }
    ];
    const selectDropdown = [...usersArray, ...ownersArray];
    const filteredDropdown = selectDropdown.filter(
      dropdDownUser => dropdDownUser.value !== currentUser.uid
    );
    return filteredDropdown;
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
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={amount}
                onChange={event => setAmount(event.target.value)}
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={description}
                onChange={event => setDescription(event.target.value)}
              />
              <Select
                value={friend}
                onChange={event => setFriend(event)}
                options={users(user)}
              />
              {friend && (
                <>
                  <label>
                    <input
                      type="radio"
                      value={user.uid}
                      checked={payee === user.uid}
                      onChange={event => setPayee(event.target.value)}
                    />
                    You paid
                  </label>
                  <label>
                    <input
                      type="radio"
                      value={friend.value}
                      checked={payee === friend.value}
                      onChange={event => setPayee(event.target.value)}
                    />
                    {friend.label} paid
                  </label>
                </>
              )}
              <button disabled={!isEnabled} type="submit">
                Submit
              </button>
            </GroupForm>
          </Width100>
        </Modal>
      </>
    )
  );
}

const mapDispatchToProps = dispatch => ({
  getGroup: id => dispatch(getGroup(id)),
  getExpenses: user => dispatch(getExpenses(user)),
  createExpenses: (payee, user, description, amount, friend, groupId) =>
    dispatch(createExpenses(payee, user, description, amount, friend, groupId))
});

const mapStateToProps = state => ({
  user: state.userState.user,
  group: state.groupState.group,
  expenses: state.expenseState.expenses,
  pending: state.expenseState.pending
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Group);
