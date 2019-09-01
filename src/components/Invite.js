import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroup, joinGroup } from '../store/actions/groupActions';
import { InviteForm, LoginForm } from './styles/Form';
import Box from './styles/Box';
import { H1 } from './styles/Text';

function Invite(props) {
  const groupId = props.match.params.groupId;
  const group = useSelector(store => store.groupState.group);
  const user = useSelector(store => store.userState.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchGroup(groupId));
  }, [dispatch, groupId]);

  const submit = event => {
    const provider = event.target.dataset.provider;
    event.preventDefault();
    dispatch(joinGroup(provider, user, groupId, group));
  };

  return !user && group ? (
    <Box>
      <H1 text={`Join ${group.name}`} />
      <LoginForm cb={submit} provider={'google'} />
      <LoginForm cb={submit} provider={'facebook'} />
    </Box>
  ) : (
    group && (
      <Box>
        <InviteForm cb={submit}>
          <button type='submit'>Join {group.name}</button>
        </InviteForm>
      </Box>
    )
  );
}

export default Invite;
