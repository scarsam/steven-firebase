import React from 'react';
import { Field } from 'formik';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

function GroupAmounts({ user, index }) {
  return (
    <Form.Group key={index}>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>{user.name}</InputGroup.Text>
          <InputGroup.Text>$</InputGroup.Text>
        </InputGroup.Prepend>
        <Field
          placeholder='amount'
          className='form-control'
          type='number'
          name={`users[${index}].amount`}
        />
      </InputGroup>
    </Form.Group>
  );
}

export default GroupAmounts;
