import React from 'react';
import { Field, Group } from 'formik';
import InputGroup from 'react-bootstrap/InputGroup';

function GroupAmounts({ user, index }) {
  return (
    <Group key={index}>
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
    </Group>
  );
}

export default GroupAmounts;
