import React from 'react';
import { Group } from 'react-bootstrap/Form';
import Form from 'react-bootstrap/Form';

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

function GroupRadioButtons({ values, setFieldValue }) {
  return radioButtons.map((button, index) => (
    <Group key={index}>
      <Form.Check
        custom
        type='radio'
        id={`radio-${index}`}
        label={button.label}
        checked={button.value === values.split}
        onChange={() => setFieldValue('split', button.value)}
      />
    </Group>
  ));
}

export default GroupRadioButtons;
