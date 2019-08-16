import React from "react";
import styled from "styled-components";
import CopyClipboard from "./CopyClipboard";
import { connect } from "react-redux";
import { getGroup } from "../store/actions/groupAction";
import Box from "./styles/Box";

const GroupStyles = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  input {
    position: absolute;
  }
`;

const BorderBottom = styled.div`
  border-bottom: 1px solid black;
`;

const Wrapper = styled.div`
  align-items: center;
  justify-content: space-between;
  display: flex;
`;

function Group(props) {
  const { getGroup, group } = props;
  const groupId = props.match.params.groupId;

  React.useEffect(() => {
    getGroup(groupId);
  }, []);

  return (
    group && (
      <>
        <Box>
          <TopBar>
            <p>Group name: {group.name}</p>
          </TopBar>
          <Wrapper>
            <p>You owe -$150</p>
            <button>Get even</button>
          </Wrapper>
          <BorderBottom />
          <GroupStyles>
            <p>Sam Ojling</p>
            <p>Wine</p>
            <p>-$100</p>
          </GroupStyles>
          <GroupStyles>
            <p>Max Moubabe</p>
            <p>Taxi</p>
            <p>+$100</p>
          </GroupStyles>
          <GroupStyles>
            <p>King Gabbe</p>
            <p>Water</p>
            <p>-$150</p>
          </GroupStyles>
        </Box>
        <CopyClipboard />
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
