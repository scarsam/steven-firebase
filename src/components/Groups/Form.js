import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function NewGroup({ errors, handleSubmit, handleChange }) {
  return (
    <>
      <Form.Control
        className='pl-1 mr-2 col'
        placeholder='Group name'
        type='text'
        name='name'
        onChange={handleChange}
        isInvalid={!!errors.name}
      />
      <Button variant='primary' onClick={handleSubmit}>
        Submit
      </Button>

      <Form.Control.Feedback type='invalid'>
        {errors.name}
      </Form.Control.Feedback>
    </>
  );
}

export default NewGroup;
