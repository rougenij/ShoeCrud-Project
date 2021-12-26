import React from "react";
import Button from "../Button/Button";
import "./Card.css";

const Card = (props) => {
  const handleClick = () => {
    props.handleChangeEdit(props.id);
    console.log(props);
  };

  return (
    <div className="game-manager-container">
      <img src={props.imgUrl} alt={props.brand} />
      <span className="game-manager-name">{props.brand}</span>
      <span className="game-manager-name">{props.price} &#8362;</span>
      <div className="btns-container">
        <Button text="Edit" clickHandle={handleClick} />
        <Button
          text="Delete"
          clickHandle={() => {
            props.handleButton2(props.id);
          }}
        />
      </div>
    </div>
  );
};

export default Card;
