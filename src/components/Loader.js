import React from "react";

const Loader = (props) => {
  return (
    <>
      <div className="loader"></div>
      <p style={props.styling}>{props.loadingMsg}</p>
    </>
  );
};

export default Loader;
