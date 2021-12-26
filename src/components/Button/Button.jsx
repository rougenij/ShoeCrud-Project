import React from "react";
import "./btn.css";

const Button = (props) => {
  return (
    <div onClick={props.clickHandle} className={"btn " + props.classes}>
      {props.text}
    </div>
  );
};

export default Button;
