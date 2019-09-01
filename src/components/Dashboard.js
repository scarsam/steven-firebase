import React from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchJoinedGroups,
  fetchCreatedGroups,
  createGroup,
  deleteGroup,
  leaveGroup
} from '../store/actions/groupActions';
import { slugify } from '../utils/slugify';
import Box from './styles/Box';
import { H4 } from './styles/Text';
import Group from './styles/Group';
import {
  DeleteGroupButton,
  CloseButton,
  AddGroupButton,
  ButtonWrapper
} from './styles/Buttons';
import { GroupForm } from './styles/Form';
import { Width100 } from './styles/Helpers';

function Dashboard(props) {
  const [name, setName] = React.useState('');
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const groups = useSelector(store => store.groupState);
  const user = useSelector(store => store.userState.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCreatedGroups(user));
    dispatch(fetchJoinedGroups(user));
  }, [user, dispatch]);

  const submit = event => {
    event.preventDefault();
    setName('');
    setModalIsOpen(false);
    dispatch(createGroup(user, name));
  };

  const onDeleteGroup = id => {
    dispatch(deleteGroup(id));
  };

  const onLeaveGroup = id => {
    dispatch(leaveGroup(user, id));
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
        {groups.pending && <p>Loading...</p>}
        {!groups.pending &&
          groups.createdGroups.length === 0 &&
          groups.joinedGroups.length === 0 && (
            <p>
              Looks like you haven't created or joined any groups yet. Create
              you first group or join your friends.
            </p>
          )}
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
                  text={'Delete'}
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
                <p>{group.users.length} members</p>
                <DeleteGroupButton
                  cb={() => onLeaveGroup(group.id)}
                  text={'Leave'}
                />
              </Group>
            ))}
          </>
        )}
      </Box>
      <ButtonWrapper>
        <AddGroupButton cb={openModal} text={'+'} />
      </ButtonWrapper>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Example Modal'
        portalClassName='modal'
      >
        <CloseButton cb={closeModal} text={'x'} />
        <Width100>
          <H4 marginTop={false} text={'Create a new group'} />
          <GroupForm cb={submit}>
            <input
              type='text'
              name='name'
              placeholder='Group name'
              value={name}
              onChange={event => setName(event.target.value)}
            />
            <button type='submit'>Create Group</button>
          </GroupForm>
        </Width100>
      </Modal>
    </>
  );
}

export default Dashboard;
