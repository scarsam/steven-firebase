import React from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import {
  fetchJoinedGroups,
  fetchCreatedGroups,
  createGroup
} from '../store/actions/groupActions';
import GroupList from './GroupList';
import { H4 } from './styles/Text';
import Box from './styles/Box';
import { Button, CloseButton, RoundButton } from './styles/Buttons';

function Dashboard(props) {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const createdGroups = useSelector(store => store.groupState.createdGroups);
  const joinedGroups = useSelector(store => store.groupState.joinedGroups);
  const user = useSelector(store => store.userState.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCreatedGroups(user));
    dispatch(fetchJoinedGroups(user));
  }, [user, dispatch]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Box>
        <>
          <GroupList created={true} groups={createdGroups} user={user} />
          <GroupList created={false} groups={joinedGroups} user={user} />
        </>
      </Box>
      <RoundButton cb={openModal}>+</RoundButton>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Example Modal'
        portalClassName='modal'
      >
        <CloseButton cb={closeModal}>x</CloseButton>
        <H4 marginTop={false} text={'Create a new group'} />
        <Formik
          initialValues={{ name: '' }}
          onSubmit={async (values, { resetForm }) => {
            const { name } = values;

            setModalIsOpen(false);
            await dispatch(createGroup(user, name));
            resetForm();
          }}
          render={() => (
            <Form>
              <Field placeholder='Group name' type='text' name='name' />
              <Button type='submit'>Submit</Button>
            </Form>
          )}
        />
      </Modal>
    </>
  );
}

export default Dashboard;
