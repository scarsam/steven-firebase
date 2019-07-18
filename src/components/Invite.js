import React from "react";
import { FirebaseContext } from "../firebase";

function Invite(props) {
  const { firebase } = React.useContext(FirebaseContext);

  async function onSubmit(event) {
    const groupId = props.match.params.groupId;
    event.preventDefault();
    try {
      await firebase.joinGroup(groupId);
      props.history.push(`/group/${groupId}`);
    } catch (err) {
      console.error("Failed social sign in", err);
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <button type="submit">Login</button>
    </form>
  );
}

export default Invite;
