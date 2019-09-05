import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { slugify } from '../utils/slugify';
import { deleteGroup, leaveGroup } from '../store/actions/groupActions';

function GroupList({ joinedGroups, createdGroups, user }) {
  const dispatch = useDispatch();

  const onSubmit = (created, id) => {
    created ? dispatch(deleteGroup(id)) : dispatch(leaveGroup(user, id));
  };

  const renderGroup = (created, groupArray) => (
    <>
      <h2 className='pb-2'>
        {created ? "Groups you've created" : "Groups you've joined"}
      </h2>
      <ul class='list-group'>
        {groupArray.map(group => (
          <li
            key={group.id}
            class='list-group-item d-flex justify-content-between align-items-center'
          >
            <Link to={`/group/${group.id}/${slugify(group.name)}`}>
              {group.name}
            </Link>
            <span class='badge badge-primary badge-pill'>
              {group.users.length} members
            </span>
            <button
              type='button'
              onClick={() => onSubmit(created, group.id)}
              className='badge badge-danger border-0'
            >
              {created ? 'Delete' : 'Leave'}
            </button>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <>
      {joinedGroups.length !== 0 && renderGroup(false, joinedGroups)}
      {createdGroups.length !== 0 && renderGroup(true, createdGroups)}
    </>
  );
}

export default GroupList;
