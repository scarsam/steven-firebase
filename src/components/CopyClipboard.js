import React from "react";

function CopyClipboard() {
  const inputEl = React.useRef(null);

  function copyText() {
    inputEl.current.select();
    document.execCommand("copy");
    return false;
  }

  const url = `${window.location.href}/invite`;
  return (
    <>
      <button onClick={() => copyText()}>Copy invite link</button>
      <input
        style={{ opacity: "0" }}
        ref={inputEl}
        type="text"
        defaultValue={url}
      />
    </>
  );
}

export default CopyClipboard;
