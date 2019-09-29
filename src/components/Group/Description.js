import React from 'react';
import Form from 'react-bootstrap/Form';

function GroupDescription({ errors, handleChange }) {
  return (
    <>
      <Form.Control
        placeholder='Description'
        type='text'
        name='description'
        onChange={handleChange}
        isInvalid={!!errors.description}
      />
      <Form.Control.Feedback type='invalid'>
        {errors.description}
      </Form.Control.Feedback>
    </>
  );
}

export default GroupDescription;
