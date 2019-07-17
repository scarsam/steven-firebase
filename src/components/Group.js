import React from "react";
import { FirebaseContext } from "../firebase";

function Group(props) {
  const [group, setGroup] = React.useState(null);

  const { firebase, user } = React.useContext(FirebaseContext);
  const groupId = props.match.params.groupId;
  const groupRef = firebase.db.collection("groups").doc(groupId);

  React.useEffect(() => {
    getGroup();
  }, []);

  function getGroup() {
    groupRef.get().then(doc => {
      setGroup({ ...doc.data(), id: doc.id });
    });
  }

  return !group ? <div>Loading...</div> : <div>Group name: {group.name}</div>;
}

export default Group;
