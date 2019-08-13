import React from "react";
import { connect } from "react-redux";
import { logout } from "../store/actions/userActions";
import styled from "styled-components";

const Header = styled.header`
  align-items: center;
  display: flex;
  height: 10vh;
  justify-content: center;
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
`;

const Footer = styled.footer`
  align-items: center;
  display: flex;
  height: 10vh;
  justify-content: center;
`;

function Layout({ pending, user, logout, children }) {
  return (
    <>
      <Header>
        <Name>Steven</Name>
        {user && (
          <button onClick={() => logout()}>logout {user.displayName}</button>
        )}
      </Header>
      {pending ? <p>Loading...</p> : <Main>{children}</Main>}
      <Footer>This is the footer</Footer>
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
