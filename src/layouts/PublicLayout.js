import React from "react";

function PublicLayout(props) {
  return (
    <>
      <header>This is the header</header>
      <main>{props.children}</main>
      <footer>This is the footer</footer>
    </>
  );
}

export default PublicLayout;
