import React from "react";

function Loader() {
  return (
    <div className="d-flex justify-content-center vh-100 align-items-center">
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
}

export default Loader;
