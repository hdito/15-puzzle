import { Component } from "react";
import "./App.css";
import { Gameboard } from "./Gameboard.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { win: false };
    this.handleWin = this.handleWin.bind(this);
  }
  handleWin(result) {
    this.setState({ win: result });
  }
  render() {
    return (
      <div>
        <h1
          className={
            this.state.win === true ? "result" : "result invisible"
          }
        >
          You win!
        </h1>
        <Gameboard onWin={this.handleWin} size={4}></Gameboard>
      </div>
    );
  }
}

export default App;
