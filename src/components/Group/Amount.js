import React from 'react';
import { Field } from 'formik';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function GroupAmount() {
  return (
    <Form.Group>
      <InputGroup className='mb-3'>
        <InputGroup.Prepend>
          <InputGroup.Text>$</InputGroup.Text>
        </InputGroup.Prepend>
        <Field
          className='form-control'
          placeholder='Amount'
          type='number'
          name='paid'
        />
      </InputGroup>
    </Form.Group>
  );
}

export default GroupAmount;
