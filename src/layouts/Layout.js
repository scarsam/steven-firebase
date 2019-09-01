import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../store/actions/userActions';
import Container from '../components/styles/Container';
import Header from '../components/styles/Header';
import { Button } from '../components/styles/Buttons';
import Loading from '../components/styles/Loading';
import Main from '../components/styles/Main';
import Logo from '../components/styles/Logo';
import Footer from '../components/styles/Footer';

function Layout({ children }) {
  const user = useSelector(store => store.userState.user);
  const pending = useSelector(store => store.userState.pending);
  const dispatch = useDispatch();

  return (
    <>
      <Header loggedIn={!!user}>
        <Container>
          <Logo text={'Steven'} />
          {user && (
            <Button cb={() => dispatch(userLogout())}>
              Logout {user.displayName}
            </Button>
          )}
        </Container>
      </Header>
      {pending ? (
        <Loading>Loading...</Loading>
      ) : (
        <Main>
          <Container>{children}</Container>
        </Main>
      )}
      <Footer text={'Made with ❤️ by ️1325 Mason'} />
    </>
  );
}

export default Layout;
