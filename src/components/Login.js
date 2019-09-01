import React from 'react';
import { useDispatch } from 'react-redux';
import { userAuth } from '../store/actions/userActions';
import Container from './styles/Container';
import Box from './styles/Box';
import { H1, TextLarge } from './styles/Text';
import { LoginForm } from './styles/Form';

function Login(props) {
  const dispatch = useDispatch();

  const auth = event => {
    const provider = event.target.dataset.provider;
    event.preventDefault();
    dispatch(userAuth(provider));
  };

  return (
    <Container>
      <Box>
        <H1 text={'Split expenses with friends'} />
        <TextLarge
          text={
            'Less stress when sharing expenses with your partner. Keep track of your shared expenses and balances with housemates, trips, groups, friends, and family.'
          }
        />
        <LoginForm cb={auth} provider={'google'} />
        <LoginForm cb={auth} provider={'facebook'} />
      </Box>
    </Container>
  );
}

export default Login;
