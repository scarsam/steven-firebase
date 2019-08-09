import React from "react";

function Invite(props) {
  // async function onSubmit(event) {
  //   const groupId = props.match.params.groupId;
  //   event.preventDefault();
  //   try {
  //     await firebase.joinGroup(groupId, user);
  //     props.history.push(`/group/${groupId}`);
  //   } catch (err) {
  //     console.error("Failed social sign in", err);
  //   }
  // }
  return (
    <form>
      <h1>HELlo</h1>
      <button type="submit">Join Group</button>
    </form>
  );
}

export default Invite;
