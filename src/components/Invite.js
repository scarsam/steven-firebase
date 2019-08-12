import React from "react";
import { connect } from "react-redux";
import { getGroup, joinGroup } from "../store/actions/groupAction";
import { auth } from "../store/actions/userActions";

function Invite(props) {
  const { user, getGroup, joinGroup, group } = props;
  const groupId = props.match.params.groupId;

  React.useEffect(() => {
    getGroup(groupId);
  }, []);

  const submit = event => {
    event.preventDefault();
    joinGroup(user, groupId);
  };

  const auth = event => {
    const provider = event.target.dataset.provider;
    event.preventDefault();
    props.auth(provider);
  };

  return !user ? (
    <>
      <form onSubmit={auth} data-provider={"google"}>
        <button type="submit">Login with Google</button>
      </form>
      <form onSubmit={auth} data-provider={"facebook"}>
        <button type="submit">Login with Facebook</button>
      </form>
    </>
  ) : (
    group && (
      <>
        <form onSubmit={submit}>
          <button type="submit">Join {group.name}</button>
        </form>
      </>
    )
  );
}

const mapDispatchToProps = dispatch => ({
  getGroup: id => dispatch(getGroup(id)),
  joinGroup: (user, id) => dispatch(joinGroup(user, id)),
  auth: provider => dispatch(auth(provider))
});

const mapStateToProps = state => ({
  user: state.userState.user,
  group: state.groupState.group
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invite);
