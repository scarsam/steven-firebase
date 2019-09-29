import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { getIn } from 'formik';

function GroupAmounts({ user, index, errors, handleChange }) {
  const amount = `users[${index}].amount`;
  const errorMsg = getIn(errors, amount);
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
          isInvalid={errorMsg}
          name={`users[${index}].amount`}
        />
        {errorMsg && (
          <Form.Control.Feedback type='invalid'>
            {errorMsg}
          </Form.Control.Feedback>
        )}
      </InputGroup>
    </Form.Group>
  );
}

export default GroupAmounts;
