import React from "react";
import ShoeMainPage from "./components/Pages/ShoeMainPage";
import "./App.css";
import "./components/Pages/pages.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ShoeMainPage />
      </div>
    );
  }
}

export default App;
