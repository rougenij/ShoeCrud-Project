import React from "react";
import Button from "../Button/Button";
import "./InputForm.css";

class InputForm extends React.Component {
  brandRef = React.createRef();
  sizeRef = React.createRef();
  priceRef = React.createRef();

  inputHandle = ({ target: { value } }, type) => {
    this.props.changeInputsState(value, type);
  };

  handleButton1 = (inputRefs) => {
    this.props.handleButton1(inputRefs);
    this.clearInputs();
  };

  handleButton2() {
    this.props.handleButton2();
    this.clearInputs();
  }

  clearInputs = () => {
    this.props.clearInputs();
  };

  render() {
    const inputRefs = [
      [this.brandRef.current, "brand"],
      [this.sizeRef.current, "size"],
      [this.priceRef.current, "price"],
    ];
    return (
      <div className="input-container">
        <div className="input-item">
          <label>Brand</label>
          <input
            ref={this.brandRef}
            onChange={(e) => this.inputHandle(e, "brand")}
            value={this.props.inputs.brand}
          ></input>
        </div>
        <div className="input-item">
          <label>Size</label>
          <input
            ref={this.sizeRef}
            onChange={(e) => this.inputHandle(e, "size")}
            value={this.props.inputs.size}
          ></input>
        </div>
        <div className="input-item">
          <label>Price</label>
          <input
            ref={this.priceRef}
            type={"number"}
            onChange={(e) => this.inputHandle(e, "price")}
            value={this.props.inputs.price}
          ></input>
        </div>
        <div className="input-btns">
          <Button
            text="Add"
            clickHandle={() => {
              this.handleButton1(inputRefs);
            }}
          />
          <Button
            text="Cancel"
            clickHandle={() => {
              this.handleButton2();
            }}
          />
        </div>
      </div>
    );
  }
}

export default InputForm;
