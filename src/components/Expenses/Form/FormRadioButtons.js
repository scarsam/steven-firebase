import React from 'react';
import { Field } from 'formik';
import { Group } from 'react-bootstrap/Form';

const radioButtons = [
  {
    label: 'Split evenly',
    value: 'true'
  },
  {
    label: 'Specific amount',
    value: 'false'
  }
];

function GroupRadioButtons({ values }) {
  return radioButtons.map((button, index) => (
    <Group key={index}>
      <div className='form-check'>
        <Field name='split'>
          {({ field }) => (
            <input
              {...field}
              type='radio'
              id={index}
              value={button.value}
              className='form-check-input'
              checked={button.value === values.split}
            />
          )}
        </Field>
        <label className='class="form-check-label' htmlFor={index} key={index}>
          {button.label}
        </label>
      </div>
    </Group>
  ));
}

export default GroupRadioButtons;
