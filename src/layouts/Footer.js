import React from 'react';

function Footer({ text }) {
  return (
    <footer className='text-white text-small align-items-center d-flex height-vh10 justify-content-center m-0'>
      {text}
    </footer>
  );
}

export default Footer;
