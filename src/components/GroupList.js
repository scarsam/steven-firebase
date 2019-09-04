import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Group from './styles/Group';
import { H4 } from './styles/Text';

import { slugify } from '../utils/slugify';
import { DeleteGroupButton } from './styles/Buttons';
import { deleteGroup, leaveGroup } from '../store/actions/groupActions';

function GroupList({ created, groups, user }) {
  const dispatch = useDispatch();

  const onSubmit = (created, id) => {
    created ? dispatch(deleteGroup(id)) : dispatch(leaveGroup(user, id));
  };

  return (
    groups.length !== 0 && (
      <>
        <H4
          marginTop={true}
          text={created ? "Groups you've created" : "Groups you've joined"}
        />
        {groups.map(group => (
          <Group key={group.id}>
            <Link to={`/group/${group.id}/${slugify(group.name)}`}>
              {group.name}
            </Link>
            <p>{group.users.length} members</p>
            <DeleteGroupButton
              cb={() => onSubmit(created, group.id)}
              text={created ? 'Delete' : 'Leave'}
            />
          </Group>
        ))}
      </>
    )
  );
}

export default GroupList;
