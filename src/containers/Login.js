import React from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { userAuth } from '../store/actions/userActions';
import Box from '../layouts/Box';

function Login() {
  const dispatch = useDispatch();

  const auth = event => {
    const provider = event.target.dataset.provider;
    event.preventDefault();
    dispatch(userAuth(provider));
  };

  return (
    <Box center='true'>
      <h1>Split expenses with friends</h1>
      <p>
        Less stress when sharing expenses with your partner. Keep track of your
        shared expenses and balances with housemates, trips, groups, friends,
        and family.
      </p>
      <Form onSubmit={auth} data-provider='facebook'>
        <Form.Group>
          <Button variant='btn btn-facebook' type='submit' block>
            Continue with Facebook
          </Button>
        </Form.Group>
      </Form>
      <Form onSubmit={auth} data-provider='google'>
        <Form.Group>
          <Button variant='btn btn-google' type='submit' block>
            Continue with Google
          </Button>
        </Form.Group>
      </Form>
    </Box>
  );
}

export default Login;
