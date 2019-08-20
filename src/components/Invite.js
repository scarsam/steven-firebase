import React from "react";
import { connect } from "react-redux";
import { getGroup, joinGroup } from "../store/actions/groupActions";
import { auth } from "../store/actions/userActions";

function Invite(props) {
  const { user, getGroup, joinGroup, group } = props;
  const groupId = props.match.params.groupId;

  React.useEffect(() => {
    getGroup(groupId);
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
  getGroup: id => dispatch(getGroup(id)),
  joinGroup: (provider, user, id) => dispatch(joinGroup(provider, user, id)),
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
