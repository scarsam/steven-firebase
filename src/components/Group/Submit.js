import React from 'react';
import Button from 'react-bootstrap/Button';

function GroupSubmit({ text }) {
  return (
    <Button type='submit' variant='primary' block>
      {text}
    </Button>
  );
}

export default GroupSubmit;
