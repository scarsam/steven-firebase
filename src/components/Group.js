import React from "react";
import styled from "styled-components";
import Select from "react-select";
import Modal from "react-modal";
import CopyClipboard from "./CopyClipboard";
import { connect } from "react-redux";
import { getGroup } from "../store/actions/groupAction";
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
  const { getGroup, group, user } = props;
  const groupId = props.match.params.groupId;
  const [description, setDescription] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [radio, setRadio] = React.useState("");
  const [expenseUser, setexpenseUser] = React.useState("");
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  React.useEffect(() => {
    getGroup(groupId);
  }, []);

  const submit = async event => {
    console.log(radio);
    event.preventDefault();
    setAmount("");
    setDescription("");
    setexpenseUser("");
    setRadio("");
    setModalIsOpen(false);

    const plusOrMinus = user => (radio === user ? "+" : "-");

    // Get a new write batch
    const batch = firebase.firestore().batch();

    const userExpenseRef = firebase
      .firestore()
      .collection("users")
      .doc(`${user.uid}`)
      .collection("expenses")
      .doc(`${groupId}`);
    batch.update(userExpenseRef, {
      items: firebase.firestore.FieldValue.arrayUnion({
        description,
        amount: `${plusOrMinus("you")}${amount}`
      })
    });

    var expenseUserExpenseRef = firebase
      .firestore()
      .collection("users")
      .doc(`${expenseUser.value}`)
      .collection("expenses")
      .doc(`${groupId}`);
    batch.update(expenseUserExpenseRef, {
      items: firebase.firestore.FieldValue.arrayUnion({
        description,
        amount: `${plusOrMinus("user")}${amount}`
      })
    });

    // Commit the batch
    batch.commit().then(function() {
      console.log("hi");
    });
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

  return (
    group && (
      <>
        <Box>
          <TopBar>
            <p>Group name: {group.name}</p>
          </TopBar>
          <Wrapper>
            <p>You owe -$150</p>
            <button>Get even</button>
          </Wrapper>
          <BorderBottom />
          <GroupStyles>
            <p>Sam Ojling</p>
            <p>Wine</p>
            <p>-$100</p>
          </GroupStyles>
          <GroupStyles>
            <p>Max Moubabe</p>
            <p>Taxi</p>
            <p>+$100</p>
          </GroupStyles>
          <GroupStyles>
            <p>King Gabbe</p>
            <p>Water</p>
            <p>-$150</p>
          </GroupStyles>
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
              <button type="submit">Submit</button>
            </GroupForm>
          </Width100>
        </Modal>
      </>
    )
  );
}

const mapDispatchToProps = dispatch => ({
  getGroup: id => dispatch(getGroup(id))
});

const mapStateToProps = state => ({
  user: state.userState.user,
  group: state.groupState.group
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Group);
