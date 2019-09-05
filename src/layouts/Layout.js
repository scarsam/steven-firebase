import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../store/actions/userActions';
import Header from '../components/styles/Header';
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
          <button
            className='btn btn-light'
            onClick={() => dispatch(userLogout)}
          >
            Logout {user.displayName}
          </button>
        )}
      </Header>
      <Main>{pending ? <Loading>Loading...</Loading> : children}</Main>
      <Footer text={'Made with ❤️ by ️1325 Mason'} />
    </>
  );
}

export default Layout;
