import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Group } from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { fetchGroups, createGroup } from '../store/actions/groupActions';
import Groups from './Groups';
import Box from './styles/Box';

function Dashboard() {
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

  return (
    <>
      <Box>
        {!pending && joinedGroups.length === 0 && createdGroups.length === 0 && (
          <Alert variant='info'>
            <h5>Create a group</h5>
            <p>
              Before you can add expenses, you need to create a new group. Click
              the <strong>button below</strong> to get started.
            </p>
          </Alert>
        )}
        <Groups
          joinedGroups={joinedGroups}
          createdGroups={createdGroups}
          user={user}
        />
      </Box>
      <>
        <Row className='mt-4 text-center'>
          <Col>
            <Button variant='primary' onClick={handleShow}>
              Create a new group
            </Button>
          </Col>
        </Row>

        <Modal show={show} size='sm' onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Create a new group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Formik
                  initialValues={{ name: '' }}
                  onSubmit={(values, { resetForm }) => {
                    const { name } = values;

                    setShow(false);
                    dispatch(createGroup(user, name));
                    resetForm();
                  }}
                  render={() => (
                    <Form className='form-inline'>
                      <Group>
                        <Field
                          className='pl-1 mr-2 form-control'
                          placeholder='Group name'
                          type='text'
                          name='name'
                        />
                        <Button variant='primary'>Submit</Button>
                      </Group>
                    </Form>
                  )}
                />
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      </>
    </>
  );
}

export default Dashboard;
