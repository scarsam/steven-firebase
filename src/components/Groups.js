import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { slugify } from '../utils/slugify';
import { deleteGroup, leaveGroup } from '../store/actions/groupActions';

function Groups({ joinedGroups, createdGroups, user }) {
  const dispatch = useDispatch();

  const onSubmit = (created, id) => {
    created ? dispatch(deleteGroup(id)) : dispatch(leaveGroup(user, id));
  };

  const renderGroup = (created, groupArray) => (
    <>
      <h2 className='pb-2'>
        {created ? "Groups you've created" : "Groups you've joined"}
      </h2>
      <ListGroup variant='flush'>
        {groupArray.map(group => (
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
                  onClick={() => onSubmit(created, group.id)}
                  variant='danger'
                >
                  {created ? 'Delete' : 'Leave'}
                </Badge>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );

  return (
    <>
      {joinedGroups.length !== 0 && renderGroup(false, joinedGroups)}
      {createdGroups.length !== 0 && renderGroup(true, createdGroups)}
    </>
  );
}

export default Groups;
