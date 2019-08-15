import React from "react";
import Modal from "react-modal";
import { slugify } from "../utils/slugify";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  getJoinedGroups,
  getCreatedGroups,
  createGroup,
  deleteGroup,
  leaveGroup
} from "../store/actions/groupAction";

const Wrapper = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
  border: 1px solid #49adc5;
  display: flex;
  flex-direction: column;
  min-height: 350px;
  padding: 15px;
`;

const AddGroup = styled.button`
  color: white;
  border-radius: 50%;
  background-color: #6dd5ed;
  border: 2px solid white;
  font-weight: 500;
  font-size: 18px;
  line-height: 1;
  height: 45px;
  width: 45px;
  &:hover {
    cursor: pointer;
  }
`;

const Group = styled.div`
  border: 1px solid #2193b0;
  padding: 10px 20px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const AddGroupForm = styled.form`
  display: flex;
  flex-direction: column;
  input {
    height: 30px;
    border-radius: 3px;
    border: 1px solid #6dd5ed;
    margin: 15px 0 10px 0;
    padding: 0 5px;
  }
`;

const FormButton = styled.button`
  background-color: #6dd5ed;
  padding: 10px 15px !important;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
`;

const Width100 = styled.div`
  width: 100%;
`;

function Dashboard({
  user,
  groups,
  getCreatedGroups,
  getJoinedGroups,
  createGroup,
  deleteGroup,
  leaveGroup
}) {
  const [name, setName] = React.useState("");
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  React.useEffect(() => {
    getCreatedGroups(user);
    getJoinedGroups(user);
  }, []);

  const submit = event => {
    event.preventDefault();
    setName("");
    setModalIsOpen(false);
    createGroup(user, name);
  };

  const onDeleteGroup = id => {
    deleteGroup(id);
  };

  const onLeaveGroup = id => {
    leaveGroup(user, id);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Wrapper>
        {groups.createdGroups.length > 0 && (
          <>
            <h4>Groups you've created</h4>
            {groups.createdGroups.map(group => (
              <Group key={group.id}>
                <Link to={`/group/${group.id}/${slugify(group.name)}`}>
                  {group.name}
                </Link>
                {group.users.length} members
                <button onClick={() => onDeleteGroup(group.id)}>
                  Delete group
                </button>
              </Group>
            ))}
          </>
        )}
        {groups.joinedGroups.length > 0 && (
          <>
            <h4>Groups you've joined</h4>
            {groups.joinedGroups.map(group => (
              <Group key={group.id}>
                <Link to={`/group/${group.id}/${slugify(group.name)}`}>
                  {group.name}
                </Link>
                {group.users.length} members
                <button onClick={() => onLeaveGroup(group.id)}>
                  Leave group
                </button>
              </Group>
            ))}
          </>
        )}
      </Wrapper>
      <ButtonWrapper>
        <AddGroup onClick={openModal}>+</AddGroup>
      </ButtonWrapper>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        portalClassName="modal"
      >
        <CloseButton className="btn" onClick={closeModal}>
          x
        </CloseButton>
        <Width100>
          <div>Create a new group</div>
          <AddGroupForm onSubmit={submit}>
            <input
              type="text"
              name="name"
              placeholder="Group name"
              value={name}
              onChange={event => setName(event.target.value)}
            />
            <FormButton className="btn" type="submit">
              Create Group
            </FormButton>
          </AddGroupForm>
        </Width100>
      </Modal>
    </>
  );
}

const mapDispatchToProps = dispatch => ({
  getJoinedGroups: user => dispatch(getJoinedGroups(user)),
  getCreatedGroups: user => dispatch(getCreatedGroups(user)),
  createGroup: (user, name) => dispatch(createGroup(user, name)),
  deleteGroup: id => dispatch(deleteGroup(id)),
  leaveGroup: (user, id) => dispatch(leaveGroup(user, id))
});

const mapStateToProps = state => ({
  user: state.userState.user,
  groups: state.groupState
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
