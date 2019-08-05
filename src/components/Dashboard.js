import React from "react";
import { Link, withRouter } from "react-router-dom";
import { FirebaseContext } from "../firebase";

function Dashboard(props) {
  const [name, setName] = React.useState("");
  const [createdGroups, setCreatedGroups] = React.useState([]);
  const [joinedGroups, setJoinedGroups] = React.useState([]);
  const { firebase, user } = React.useContext(FirebaseContext);

  React.useEffect(() => {
    getCreatedGroups();
    getJoinedGroups();
  }, []);

  function logout() {
    firebase.logout();
    props.history.push("/");
  }

  function getCreatedGroups() {
    return firebase.db
    .collection("users")
    .doc(user.uid)
    .collection("groups")
    .get()
    .then(snapshot => {
      const groups = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCreatedGroups(groups);
    });
  }

  function getJoinedGroups() {
    return firebase.db
    .collectionGroup("groups")
    .where('users', 'array-contains', { id: user.uid, name: user.displayName })
    .get()
    .then(snapshot => {
      const groups = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }
      ));
      setJoinedGroups(groups);
    });
  }

  function submit(event) {
    event.preventDefault();
    const newGroupRef = firebase.db.collection("users").doc(user.uid).collection('groups').doc();
    const newGroup = {
      id: newGroupRef.id,
      owner: {
        id: user.uid,
        name: user.displayName
      },
      users: [],
      name,
      created: Date.now()
    };
    setCreatedGroups([newGroup, ...createdGroups]);
    newGroupRef.set(newGroup)
  }

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
      <button onClick={logout}>logout</button>
    </>
  );
}

export default withRouter(Dashboard);
