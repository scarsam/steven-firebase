import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { fetchGroups, createGroup } from '../store/actions/groupActions';
import Group from '../components/Group';
import NewGroup from '../components/Groups/Form';
import Box from '../layouts/Box';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Group name is required!')
});

function Groups() {
  const [show, setShow] = useState(false);
  const createdGroups = useSelector(store => store.groupState.createdGroups);
  const joinedGroups = useSelector(store => store.groupState.joinedGroups);
  const pending = useSelector(store => store.groupState.pending);
  const user = useSelector(store => store.userState.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchGroups(user));
  }, [user, dispatch]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const noGroups = () =>
    !pending && joinedGroups.length === 0 && createdGroups.length === 0;

  return (
    <>
      <Box>
        {noGroups() && (
          <Alert variant='info'>
            <h5>Create a group</h5>
            <p>
              Before you can add expenses, you need to create a new group. Click
              the <strong>button below</strong> to get started.
            </p>
          </Alert>
        )}
        {joinedGroups.length >= 1 && (
          <ListGroup variant='flush'>
            <h2 className='pb-2 pt-4'>Groups you've joined</h2>
            {joinedGroups.map(group => (
              <Group group={group} user={user} />
            ))}
          </ListGroup>
        )}
        {createdGroups.length >= 1 && (
          <ListGroup variant='flush'>
            <h2 className='pb-2 pt-4'>Groups you've created</h2>
            {createdGroups.map(group => (
              <Group group={group} user={user} />
            ))}
          </ListGroup>
        )}
      </Box>
      <>
        <Row className='mt-4 text-center'>
          <Col>
            <Button variant='primary' onClick={handleShow}>
              Create a new group
            </Button>
          </Col>
        </Row>

        <Modal show={show} size='md' onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Create a new group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Formik
                initialValues={{ name: '' }}
                onSubmit={(values, { resetForm }) => {
                  const { name } = values;

                  setShow(false);
                  dispatch(createGroup(user, name));
                  resetForm();
                }}
                validationSchema={validationSchema}
                render={({ errors, handleSubmit }) => (
                  <Form className='form-inline row'>
                    <NewGroup errors={errors} handleSubmit={handleSubmit} />
                  </Form>
                )}
              />
            </Container>
          </Modal.Body>
        </Modal>
      </>
    </>
  );
}

export default Groups;
