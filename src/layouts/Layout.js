import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { userLogout } from '../store/actions/userActions';
import Header from '../components/styles/Header';
import Main from '../components/styles/Main';
import Footer from '../components/styles/Footer';

function Layout({ children }) {
  const user = useSelector(store => store.userState.user);
  const pending = useSelector(store => store.userState.pending);
  const dispatch = useDispatch();

  return (
    <>
      <Header>
        {user && (
          <Button variant='light' onClick={() => dispatch(userLogout)}>
            Logout {user.displayName}
          </Button>
        )}
      </Header>
      <Main>
        {pending ? (
          <Row className='justify-content-center'>
            <Col sm='auto'>
              <Spinner animation='grow' variant='light' />
            </Col>
          </Row>
        ) : (
          children
        )}
      </Main>
      <Footer text={'Made with ❤️ by ️1325 Mason'} />
    </>
  );
}

export default Layout;
