import React from "react";
import { connect } from "react-redux";
import { logout } from "../store/actions/userActions";
import styled from "styled-components";

const Header = styled.header`
  align-items: center;
  display: flex;
  height: 10vh;
  justify-content: center;
  div {
    ${props =>
      props.loggedIn
        ? `
      display: flex;
      justify-content: space-between;
    `
        : ""}
  }
`;

const Name = styled.h1`
  color: white;
  font-weight: bold;
  margin: 0;
`;

const Main = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  & > div {
    flex-direction: column;
  }
`;

const Loading = styled.p`
  color: white;
  display: flex;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
`;

const Footer = styled.p`
  color: white;
  align-items: center;
  font-size: 12px;
  display: flex;
  height: 10vh;
  justify-content: center;
  margin: 0;
`;

const Container = styled.div`
  max-width: 500px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

function Layout({ pending, user, logout, children }) {
  return (
    <>
      <Header loggedIn={!!user}>
        <Container>
          <Name>Steven</Name>
          {user && (
            <button className="btn" onClick={() => logout()}>
              Logout {user.displayName}
            </button>
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
      <Footer>Made with ❤️ by ️1325 Mason</Footer>
    </>
  );
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout)
});

const mapStateToProps = state => ({
  pending: state.userState.pending,
  user: state.userState.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
