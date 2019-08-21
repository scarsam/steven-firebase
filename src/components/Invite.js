import React from "react";
import { connect } from "react-redux";
import { fetchGroup, joinGroup } from "../store/actions/groupActions";
import { userAuth } from "../store/actions/userActions";

function Invite({ user, fetchGroup, joinGroup, group, ...rest }) {
  const groupId = rest.match.params.groupId;

  React.useEffect(() => {
    fetchGroup(groupId);
  }, []);

  const submit = event => {
    const provider = event.target.dataset.provider;
    event.preventDefault();
    joinGroup(provider, user, groupId, group);
  };

  return !user && group ? (
    <>
      <p>Join {group.name}</p>
      <form onSubmit={submit} data-provider={"google"}>
        <button type="submit">Login with Google</button>
      </form>
      <form onSubmit={submit} data-provider={"facebook"}>
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
  fetchGroup: id => dispatch(fetchGroup(id)),
  joinGroup: (provider, user, id) => dispatch(joinGroup(provider, user, id)),
  userAuth: provider => dispatch(userAuth(provider))
});

const mapStateToProps = state => ({
  user: state.userState.user,
  group: state.groupState.group
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Invite);
