import React from "react";

function CopyClipboard(props) {
  const inputEl = React.useRef(null);

  function copyText() {
    inputEl.current.select();
    document.execCommand("copy");
    return false;
  }

  const url = `/group/${props.group}/invite`;

  return (
    <>
      <button onClick={() => copyText()}>Copy invite link</button>
      <input ref={inputEl} type="text" defaultValue={url} />
    </>
  );
}

export default CopyClipboard;
