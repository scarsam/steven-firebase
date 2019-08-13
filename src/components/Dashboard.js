import React from "react";
import { slugify } from "../utils/slugify";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getJoinedGroups,
  getCreatedGroups,
  createGroup,
  deleteGroup,
  leaveGroup
} from "../store/actions/groupAction";

function Dashboard({
  user,
  groups,
  getCreatedGroups,
  getJoinedGroups,
  createGroup,
  deleteGroup,
  leaveGroup
}) {
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    getCreatedGroups(user);
    getJoinedGroups(user);
  }, []);

  const submit = event => {
    event.preventDefault();
    setName("");
    createGroup(user, name);
  };

  const onDeleteGroup = id => {
    deleteGroup(id);
  };

  const onLeaveGroup = id => {
    leaveGroup(id);
  };

  return (
    <>
      <form onSubmit={submit}>
        <input
          type="text"
          name="name"
          placeholder="Group name"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <button type="submit">Create Group</button>
      </form>
      <h4>Groups you've created</h4>
      {groups.createdGroups &&
        groups.createdGroups.map(group => (
          <div key={group.id}>
            <Link to={`/group/${group.id}/${slugify(group.name)}`}>
              {group.name}
            </Link>
            <button onClick={() => onDeleteGroup(group.id)}>
              Delete group
            </button>
          </div>
        ))}
      <h4>Groups you've joined</h4>
      {groups.joinedGroups &&
        groups.joinedGroups.map(group => (
          <div key={group.id}>
            <Link to={`/group/${group.id}/${slugify(group.name)}`}>
              {group.name}
            </Link>
            <button onClick={() => onLeaveGroup(group.id)}>Leave group</button>
          </div>
        ))}
    </>
  );
}

const mapDispatchToProps = dispatch => ({
  getJoinedGroups: user => dispatch(getJoinedGroups(user)),
  getCreatedGroups: user => dispatch(getCreatedGroups(user)),
  createGroup: (user, name) => dispatch(createGroup(user, name)),
  deleteGroup: id => dispatch(deleteGroup(id)),
  leaveGroup: id => dispatch(leaveGroup(id))
});

const mapStateToProps = state => ({
  user: state.userState.user,
  groups: state.groupState
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
