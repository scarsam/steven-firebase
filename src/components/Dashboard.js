import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getJoinedGroups, getCreatedGroups } from "./store/actions/groupAction";
import { useSelector } from "react-redux";

function Dashboard(props) {
  const { user } = useSelector(state => state.userState);
  const { joinedGroups, createdGroups } = useSelector(
    state => state.groupState
  );
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    props.getCreatedGroups(user);
    props.getJoinedGroups(user);
  }, []);

  // function submit(event) {
  //   event.preventDefault();
  //   const newGroupRef = firebase.db
  //     .collection("users")
  //     .doc(user.uid)
  //     .collection("groups")
  //     .doc();
  //   const newGroup = {
  //     id: newGroupRef.id,
  //     owner: {
  //       id: user.uid,
  //       name: user.displayName
  //     },
  //     users: [],
  //     name,
  //     created: Date.now()
  //   };
  //   setCreatedGroups([newGroup, ...createdGroups]);
  //   newGroupRef.set(newGroup);
  // }

  return (
    <>
      {user && <p>Hello {user.displayName}</p>}
      {createdGroups &&
        createdGroups.map(group => (
          <div>
            <p>Groups you've created</p>
            <Link to={`/group/${group.id}`}>{group.name}</Link>
          </div>
        ))}
      {joinedGroups &&
        joinedGroups.map(group => (
          <div>
            <p>Groups you've joined</p>
            <Link to={`/group/${group.id}`}>{group.name}</Link>
          </div>
        ))}
      {/* <form onSubmit={submit}>
        <input
          type="text"
          name="name"
          placeholder="Group name"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <button type="submit">Create Group</button>
      </form> */}
    </>
  );
}

const mapDispatchToProps = dispatch => ({
  getJoinedGroups: user => dispatch(getJoinedGroups(user)),
  getCreatedGroups: user => dispatch(getCreatedGroups(user))
});

export default connect(
  null,
  mapDispatchToProps
)(Dashboard);
