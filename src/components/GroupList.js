import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Group from './styles/Group';

import { slugify } from '../utils/slugify';
import { deleteGroup, leaveGroup } from '../store/actions/groupActions';

function GroupList({ created, groups, user }) {
  const dispatch = useDispatch();

  const onSubmit = (created, id) => {
    created ? dispatch(deleteGroup(id)) : dispatch(leaveGroup(user, id));
  };

  return (
    groups.length !== 0 && (
      <>
        <h2>{created ? "Groups you've created" : "Groups you've joined"}</h2>
        {groups.map(group => (
          <Group key={group.id}>
            <Link to={`/group/${group.id}/${slugify(group.name)}`}>
              {group.name}
            </Link>
            <p className='m-0'>{group.users.length} members</p>
            <button
              type='button'
              onClick={() => onSubmit(created, group.id)}
              className='badge badge-danger border-0'
            >
              {created ? 'Delete' : 'Leave'}
            </button>
          </Group>
        ))}
      </>
    )
  );
}

export default GroupList;
