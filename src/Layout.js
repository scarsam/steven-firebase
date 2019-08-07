import React from "react";
import { connect } from "react-redux";
import { logout } from "./store/actions/userActions";
import { useSelector } from "react-redux";

function Layout(props) {
  const { user } = useSelector(state => state.userState);

  return (
    <>
      <header>
        This is the header
        {user && <button onClick={() => props.logout()}>logout</button>}
      </header>
      <main>{props.children}</main>
      <footer>This is the footer</footer>
    </>
  );
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout)
});

export default connect(
  null,
  mapDispatchToProps
)(Layout);
