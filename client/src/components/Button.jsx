import React from "react";

function Button(props) {
  return (
    <div className="button">
      <span>
        <a to="/">{props.children}</a>
      </span>
    </div>
  );
}

export default Button;
