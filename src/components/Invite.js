import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroup, joinGroup } from '../store/actions/groupActions';
import Box from './styles/Box';

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
      <h1>Join ${group.name}</h1>
      <form
        className='d-flex flex-column'
        provider={'google'}
        onSubmit={submit}
      >
        <button className='btn btn-primary' type='submit'>
          Join {group.name}
        </button>
      </form>
      <form
        className='d-flex flex-column'
        provider={'facebook'}
        onSubmit={submit}
      >
        <button className='btn btn-primary' type='submit'>
          Join {group.name}
        </button>
      </form>
    </Box>
  ) : (
    group && (
      <Box>
        <form className='d-flex flex-column' onSubmit={submit}>
          <button className='btn btn-primary' type='submit'>
            Join {group.name}
          </button>
        </form>
      </Box>
    )
  );
}

export default Invite;
