import React from "react";
import CopyClipboard from "./CopyClipboard";
import { connect } from "react-redux";
import { getGroup } from "../store/actions/groupAction";

function Group(props) {
  const { getGroup, group } = props;
  const groupId = props.match.params.groupId;

  React.useEffect(() => {
    getGroup(groupId);
  }, []);

  return (
    group && (
      <>
        <CopyClipboard />
        <p>Group name: {group.name}</p>
      </>
    )
  );
}

const mapDispatchToProps = dispatch => ({
  getGroup: id => dispatch(getGroup(id))
});

const mapStateToProps = state => ({
  group: state.groupState.group
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Group);
