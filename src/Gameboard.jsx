import React, { Component } from "react";

export class Gameboard extends Component {
  constructor(props) {
    super(props);
    const tiles = [];
    const { size } = props;
    for (let i = 0; i < props.size * props.size - 1; i++) {
      tiles.push(i + 1);
    }
    tiles.push("");
    const win = [...tiles];
    for (let i = 0; i < 10; i++) {
      const index = Math.floor(Math.random() * (size * size - 2));
      console.log(index);
      const temp = tiles[index];
      tiles.splice(index, 1);
      tiles.splice(index + 1, 0, temp);
    }

    this.state = {
      tiles: tiles,
      empty: size * size - 1,
      win: win,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    if (event.target.textContent === "") return;
    const id = +event.target.dataset.id;
    const text = +event.target.textContent;
    const empty = this.state.empty;
    const size = this.props.size;
    const { tiles } = this.state;
    let position;

    if (id + 1 === empty) {
      position = id + 1;
    } else if (id - 1 === empty) {
      position = id - 1;
    } else if (id + size === empty) {
      position = id + size;
    } else if (id - size === empty) {
      position = id - size;
    }
    if (position === undefined) return;
    tiles.splice(id, 1, "");
    tiles.splice(empty, 1, text);
    this.setState({ empty: id, tiles: tiles });
    if (tiles.every((tile, index) => tile === this.state.win[index])) {
      this.props.onWin(true);
    } else this.props.onWin(false);
  }

  render() {
    const { tiles } = this.state;
    return (
      <div
        style={{
          gridTemplateColumns: "1fr ".repeat(this.props.size),
        }}
        className="gameboard"
      >
        {tiles.map((tile, index) => (
          <div
            data-id={index}
            className={
              tile === ""
                ? "field"
                : tile === index + 1
                ? "field tile correct"
                : "field tile"
            }
            key={Math.random().toString()}
            onClick={this.handleClick}
          >
            {tile}
          </div>
        ))}
      </div>
    );
  }
}
