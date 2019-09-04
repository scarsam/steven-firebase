import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../store/actions/userActions';
import Header from '../components/styles/Header';
import { Button } from '../components/styles/Buttons';
import Loading from '../components/styles/Loading';
import Main from '../components/styles/Main';
import Footer from '../components/styles/Footer';

function Layout({ children }) {
  const user = useSelector(store => store.userState.user);
  const pending = useSelector(store => store.userState.pending);
  const dispatch = useDispatch();

  return (
    <>
      <Header loggedIn={!!user}>
        {user && (
          <Button cb={() => dispatch(userLogout())}>
            Logout {user.displayName}
          </Button>
        )}
      </Header>
      {pending ? <Loading>Loading...</Loading> : <Main>{children}</Main>}
      <Footer text={'Made with ❤️ by ️1325 Mason'} />
    </>
  );
}

export default Layout;
