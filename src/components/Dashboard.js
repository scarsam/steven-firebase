import React from "react";
import Modal from "react-modal";
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
import { slugify } from "../utils/slugify";
import Box from "./styles/Box";
import { H4 } from "./styles/Text";
import Group from "./styles/Group";
import {
  DeleteGroupButton,
  CloseButton,
  AddGroupButton,
  ButtonWrapper
} from "./styles/Buttons";
import { GroupForm } from "./styles/Form";

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
      <Box>
        {groups.createdGroups.length > 0 && (
          <>
            <H4 marginTop={true} text={"Groups you've created"} />
            {groups.createdGroups.map(group => (
              <Group key={group.id}>
                <Link to={`/group/${group.id}/${slugify(group.name)}`}>
                  {group.name}
                </Link>
                <p>{group.users.length} members</p>
                <DeleteGroupButton
                  cb={() => onDeleteGroup(group.id)}
                  text={"Delete"}
                />
              </Group>
            ))}
          </>
        )}
        {groups.joinedGroups.length > 0 && (
          <>
            <H4 marginTop={true} text={"Groups you've joined"} />
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
      </Box>
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
          <H4 marginTop={false} text={"Create a new group"} />
          <GroupForm cb={submit}>
            <input
              type="text"
              name="name"
              placeholder="Group name"
              value={name}
              onChange={event => setName(event.target.value)}
            />
            <button type="submit">Create Group</button>
          </GroupForm>
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
