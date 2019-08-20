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

import firebase from "../firebase";
import "firebase/auth";
import "firebase/firestore";

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
    expensesPending
  } = props;
  const groupId = props.match.params.groupId;
  const [description, setDescription] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [radio, setRadio] = React.useState("");
  const [expenseUser, setexpenseUser] = React.useState("");
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  React.useEffect(() => {
    getGroup(groupId);
    getExpenses(user);
  }, []);

  const isEnabled =
    description.length > 0 &&
    amount.length > 0 &&
    radio.length > 0 &&
    expenseUser.label.length > 0;

  const submit = async event => {
    event.preventDefault();
    setAmount("");
    setDescription("");
    setexpenseUser("");
    setRadio("");
    setModalIsOpen(false);

    createExpenses(radio, user, description, amount, expenseUser, groupId);
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
    if (expensesPending) return true;
    if (expenses.items.length === 0) return 0;
    const totalAmount = expenses.items.reduce((accumlator, currentValue) => {
      if (currentValue.amount.includes("-")) {
        const amount = parseFloat(currentValue.amount.split("-")[1]);
        return accumlator - amount;
      } else {
        const amount = parseFloat(currentValue.amount.split("+")[1]);
        return accumlator + amount;
      }
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
          {expenses.items &&
            expenses.items.map((expense, index) => (
              <GroupStyles key={index}>
                <p>{expense.from}</p>
                <p>{expense.description}</p>
                <p>{expense.amount}</p>
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
                value={expenseUser}
                onChange={event => setexpenseUser(event)}
                options={users(user)}
              />
              {expenseUser && (
                <>
                  <label>
                    <input
                      type="radio"
                      value="you"
                      checked={radio === "you"}
                      onChange={event => setRadio(event.target.value)}
                    />
                    You paid
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="user"
                      checked={radio === "user"}
                      onChange={event => setRadio(event.target.value)}
                    />
                    {expenseUser.label} paid
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
  createExpenses: (radio, user, description, amount, expenseUser, groupId) =>
    dispatch(
      createExpenses(radio, user, description, amount, expenseUser, groupId)
    )
});

const mapStateToProps = state => ({
  user: state.userState.user,
  group: state.groupState.group,
  expenses: state.expenseState.expenses,
  expensesPending: state.expenseState.pending
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Group);
