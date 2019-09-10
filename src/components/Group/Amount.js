import React from 'react';
import { Field, Group } from 'formik';
import InputGroup from 'react-bootstrap/InputGroup';

function GroupAmount() {
  return (
    <Group>
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
    </Group>
  );
}

export default GroupAmount;
