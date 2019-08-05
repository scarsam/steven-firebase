import React from "react";
import { FirebaseContext } from "../firebase";
import CopyClipboard from "./CopyClipboard";

function Group(props) {
  const [group, setGroup] = React.useState(null);

  const { firebase, user } = React.useContext(FirebaseContext);
  const groupId = props.match.params.groupId;
  const groupRef = firebase.db.collectionGroup("groups").where('id', '==', groupId)

  React.useEffect(() => {
    getGroup();
  }, []);

  function getGroup() {
    groupRef.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        setGroup({ ...doc.data(), id: doc.id });
      })
    });
  }

  return !group ? (
    <div>Loading...</div>
  ) : (
    <>
      <CopyClipboard group={group.id} />
      <div>Group name: {group.name}</div>
      <div>
        Group users:
        {group.users && group.users.map(user => <p>{user.name}</p>)}
      </div>
    </>
  );
}

export default Group;
