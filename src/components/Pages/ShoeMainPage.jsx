import React from "react";
import Card from "../Card/Card";
import InputForm from "../InputForm/InputForm";
import Spinner from "../Spinner/Spinner";
import mockApi from "../../api/mockApi";

class ShoeMainPage extends React.Component {
  state = {
    shoesList: [],
    isEditing: false,
    inputs: {
      brand: "",
      size: "",
    },
    spinner: false,
  };

  componentDidMount() {
    this.fetchShoes();
  }

  fetchShoes = async () => {
    this.setState({ spinner: true });
    try {
      const shoes = await mockApi.get("shoes");
      this.setState({ shoesList: shoes.data, spinner: false });
    } catch (e) {
      console.log(e);
    }
  };

  fetchShoe = async (id) => {
    const shoe = await mockApi.get(`shoes/${id}`);
    this.setState({
      inputs: {
        brand: shoe.data.brand,
        size: shoe.data.size,
      },
    });
  };

  displayShoes = () => {
    return this.state.shoesList.map((shoe, i) => {
      return (
        <Card
          key={i}
          id={shoe.id}
          brand={shoe.brand}
          handleChangeEdit={this.startEditing}
          handleButton2={this.handleDelete}
        />
      );
    });
  };

  handleButton1 = (inputRefs) => {
    const newShoe = {};
    for (let data of inputRefs) {
      newShoe[data[1]] = data[0].value;
    }
    if (!this.state.isEditing) {
      this.addToApi(newShoe);
    } else {
      this.updateApi(newShoe, this.state.currentShoe);
      this.stopEditing();
    }
  };

  handleDelete = (id) => {
    this.deleteFromApi(id);
  };

  startEditing = (id) => {
    this.setState({ isEditing: true, currentShoe: id });
    this.fetchShoe(id);
  };

  stopEditing = () => {
    this.setState({ isEditing: false });
  };

  addToApi = async (newShoe) => {
    try {
      await mockApi.post("shoes", newShoe);
      this.fetchShoes();
    } catch (e) {
      console.log(e);
    }
  };

  deleteFromApi = async (id) => {
    try {
      await mockApi.delete(`shoes/${id}`);
      const data = this.state.shoesList.filter((shoe) => shoe.id !== id);
      this.setState({ shoesList: data });
    } catch (e) {
      console.log(e);
    }
  };

  updateApi = async (newShoe, id) => {
    try {
      await mockApi.put(`shoes/${id}`, newShoe);
      const newList = [...this.state.shoesList];
      const index = this.state.shoesList.findIndex((shoe) => shoe.id === id);
      newShoe.id = id;
      newList[index] = newShoe;
      this.setState({ shoesList: newList });
    } catch (e) {
      console.log(e);
    }
  };

  changeInputsState = (value, type) => {
    this.setState({ inputs: { [type]: value } });
  };

  clearInputs = () => {
    this.setState({
      inputs: {
        brand: "",
        size: "",
      },
    });
  };

  render() {
    if (this.state.spinner) {
      return <Spinner />;
    } else
      return (
        <div className="manager-page-container">
          <div className="manager-page-input-container">
            <InputForm
              handleButton1={this.handleButton1}
              handleButton2={this.stopEditing}
              currentShoe={this.state.currentShoe}
              changeInputsState={this.changeInputsState}
              clearInputs={this.clearInputs}
              inputs={this.state.inputs}
            />
          </div>
          <div className="manager-pages-items-container">
            {this.displayShoes()}
          </div>
        </div>
      );
  }
}

export default ShoeMainPage;
