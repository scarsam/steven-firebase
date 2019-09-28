import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

function GroupAmounts({ user, index, errors, touched, handleChange }) {
  console.log(errors);
  return (
    <Form.Group key={index}>
      <InputGroup className='mb-3 mt-3'>
        <InputGroup.Prepend>
          <InputGroup.Text>{user.name}</InputGroup.Text>
          <InputGroup.Text>$</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          placeholder='amount'
          className='form-control'
          type='number'
          onChange={handleChange}
          isInvalid={errors.users && touched.users}
          name={`users[${index}].amount`}
        />
        <Form.Control.Feedback type='invalid'>
          {typeof errors.users === 'string' ? errors.users : null}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
}

export default GroupAmounts;
