import React from "react";
import { Link, withRouter } from "react-router-dom";
import { FirebaseContext } from "../firebase";

function Dashboard(props) {
  const [name, setName] = React.useState("");
  const [groups, setGroups] = React.useState([]);
  const { firebase, user } = React.useContext(FirebaseContext);

  React.useEffect(() => {
    getGroups();
  }, []);

  function logout() {
    firebase.logout();
    props.history.push("/");
  }

  function getGroups() {
    return firebase.db
      .collection("groups")
      .get()
      .then(snapshot => {
        const groups = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setGroups(groups);
      });
  }

  function submit(event) {
    event.preventDefault();
    if (!user) {
      props.history.push("/login");
    } else {
      const newGroup = {
        owner: {
          id: user.uid,
          name: user.displayName
        },
        user: [],
        name,
        created: Date.now()
      };
      setGroups([newGroup, ...groups]);
      firebase.db.collection("groups").add(newGroup);
    }
  }

  return (
    <>
      {user && <p>Hello {user.displayName}</p>}
      {groups &&
        groups.map(group => (
          <div>
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
