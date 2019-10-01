import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroup, joinGroup } from '../store/actions/groupActions';
import Box from '../layouts/Box';

function Invite(props) {
  const groupId = props.match.params.groupId;
  const group = useSelector(store => store.groupState.group);
  const user = useSelector(store => store.userState.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchGroup(groupId));
  }, [dispatch, groupId]);

  const submit = event => {
    const provider = event.target.dataset.provider;
    event.preventDefault();
    dispatch(joinGroup(provider, user, groupId, group));
  };

  return !user && group ? (
    <Box center='true'>
      <h1 className='mb-3 text-center'>Join {group.name}</h1>
      <Form onSubmit={submit} data-provider='facebook'>
        <Form.Group>
          <Button variant='btn btn-facebook' type='submit' block>
            Continue with Facebook
          </Button>
        </Form.Group>
      </Form>
      <Form onSubmit={submit} data-provider='google'>
        <Form.Group>
          <Button variant='btn btn-google' type='submit' block>
            Continue with Google
          </Button>
        </Form.Group>
      </Form>
    </Box>
  ) : (
    group && (
      <Box center='true'>
        <h1 className='mb-3 text-center'>Accept invite</h1>
        <Form onSubmit={submit}>
          <Form.Group>
            <Button variant='primary' type='submit' block>
              Join {group.name}
            </Button>
          </Form.Group>
        </Form>
      </Box>
    )
  );
}

export default Invite;
