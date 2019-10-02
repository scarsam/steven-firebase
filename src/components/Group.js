import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { slugify } from '../utils/slugify';
import { deleteGroup, leaveGroup } from '../store/actions/groupActions';

function Group({ group, user }) {
  const dispatch = useDispatch();

  const onSubmit = (created, id) => {
    created(group, user)
      ? dispatch(deleteGroup(id))
      : dispatch(leaveGroup(user, id));
  };

  const isOwner = (group, user) => group.owner.id === user.uid;

  return (
    <ListGroup.Item key={group.id}>
      <Row>
        <Col>
          <Link to={`/group/${group.id}/${slugify(group.name)}`}>
            {group.name}
          </Link>
        </Col>
        <Col>{group.users.length} members</Col>
        <Col md='auto'>
          <Badge
            onClick={() => onSubmit(isOwner(group, user), group.id)}
            variant='danger'
          >
            {isOwner(group, user) ? 'Delete' : 'Leave'}
          </Badge>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export default Group;
