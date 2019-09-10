import React from 'react';
import { Field } from 'formik';

function GroupDescription() {
  return (
    <Field
      placeholder='Description'
      className='form-control mb-3'
      type='text'
      name='description'
    />
  );
}

export default GroupDescription;
