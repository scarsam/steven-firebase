import React from "react";
import { connect } from "react-redux";
import { logout } from "../store/actions/userActions";
import styled from "styled-components";

const Header = styled.header`
  display: flex;
  height: 40px;
`;

function Layout({ pending, user, logout, children }) {
  return (
    <>
      <Header>
        Steven
        {user && (
          <button onClick={() => logout()}>logout {user.displayName}</button>
        )}
      </Header>
      {pending ? <p>Loading...</p> : <main>{children}</main>}
      <footer>This is the footer</footer>
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
