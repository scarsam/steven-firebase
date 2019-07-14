import React from "react";
import { FirebaseContext } from "../firebase";

function Dashboard(props) {
  const [name, setName] = React.useState("");
  const [groups, setGroups] = React.useState([]);
  const { firebase, user } = React.useContext(FirebaseContext);

  React.useEffect(() => {
    getGroups();
  }, [groups]);

  function logout() {
    firebase.logout();
    props.history.push("/");
  }

  async function getGroups() {
    const snapshot = await firebase.db.collection("groups").get();
    const allGroups = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setGroups(allGroups);
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
        name,
        created: Date.now()
      };
      firebase.db.collection("groups").add(newGroup);
    }
  }

  return (
    <>
      {user && <p>Hello {user.displayName}</p>}
      {groups && groups.map(group => <p>{group.name}</p>)}
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

export default Dashboard;
