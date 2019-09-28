import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function GroupAmount({ errors, touched, handleChange }) {
  return (
    <Form.Group>
      <InputGroup className='mb-3 mt-3'>
        <InputGroup.Prepend>
          <InputGroup.Text>$</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          placeholder='Amount'
          type='number'
          name='paid'
          onChange={handleChange}
          isInvalid={!!errors.paid && touched.paid}
        />
        <Form.Control.Feedback type='invalid'>
          {errors.paid}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
}

export default GroupAmount;
