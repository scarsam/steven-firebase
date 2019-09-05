import React from 'react';
import { useDispatch } from 'react-redux';
import { userAuth } from '../store/actions/userActions';
import Container from './styles/Container';
import Box from './styles/Box';

function Login(props) {
  const dispatch = useDispatch();

  const auth = event => {
    const provider = event.target.dataset.provider;
    event.preventDefault();
    dispatch(userAuth(provider));
  };

  return (
    <Container>
      <Box center='true'>
        <h1>Split expenses with friends</h1>
        <p>
          Less stress when sharing expenses with your partner. Keep track of
          your shared expenses and balances with housemates, trips, groups,
          friends, and family.
        </p>
        <form onSubmit={auth}>
          <div class='form-group'>
            <button
              provider={'facebook'}
              type='submit'
              class='btn btn-block btn-facebook'
            >
              Continue with Facebook
            </button>
          </div>
        </form>
        <form onSubmit={auth}>
          <div class='form-group'>
            <button
              provider={'google'}
              type='submit'
              class='btn btn-block btn-google'
            >
              Continue with Google
            </button>
          </div>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
