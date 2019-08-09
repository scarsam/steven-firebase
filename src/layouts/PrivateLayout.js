import React from "react";
import { connect } from "react-redux";
import { logout, userListener } from "../store/actions/userActions";
import { useSelector } from "react-redux";

function PrivateLayout(props) {
  const { user } = useSelector(state => state.userState);

  React.useEffect(() => {
    props.userListener();
  }, []);

  return (
    <>
      <header>
        This is the header
        {user && (
          <button onClick={() => props.logout()}>
            logout {user.displayName}
          </button>
        )}
      </header>
      {user ? <main>{props.children}</main> : <p>Loading...</p>}
      <footer>This is the footer</footer>
    </>
  );
}

const mapDispatchToProps = dispatch => ({
  userListener: () => dispatch(userListener),
  logout: () => dispatch(logout)
});

export default connect(
  null,
  mapDispatchToProps
)(PrivateLayout);
