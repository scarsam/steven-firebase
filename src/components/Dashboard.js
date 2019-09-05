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
import Box from './styles/Box';
import { CloseButton, RoundButton } from './styles/Buttons';

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
      <div className='d-flex justify-content-center mt-2'>
        <RoundButton cb={openModal}>+</RoundButton>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Example Modal'
        portalClassName='Modal'
      >
        <CloseButton cb={closeModal}>x</CloseButton>
        <h2 className='pb-2'>Create a new group</h2>
        <Formik
          initialValues={{ name: '' }}
          onSubmit={async (values, { resetForm }) => {
            const { name } = values;

            setModalIsOpen(false);
            await dispatch(createGroup(user, name));
            resetForm();
          }}
          render={() => (
            <Form className='form-inline'>
              <div class='form-group'>
                <Field
                  className='pl-1 mr-2 form-control'
                  placeholder='Group name'
                  type='text'
                  name='name'
                />
                <button type='submit' class='btn btn-primary'>
                  Submit
                </button>
              </div>
            </Form>
          )}
        />
      </Modal>
    </>
  );
}

export default Dashboard;
