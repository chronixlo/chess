import gameState from "../gameState";

export default class Piece {
  x = null;
  y = null;
  element = null;
  color = null;
  type = null;

  constructor({ x, y, color }) {
    this.x = x;
    this.y = y;
    this.color = color;

    const element = document.createElement("div");
    element.classList.add("piece", this.color);
    element.style.transform = `translate(${this.x * 50}px, ${this.y * 50}px)`;

    gameState.piecesElement.appendChild(element);
    this.element = element;
  }

  move(square) {
    this.x = square.x;
    this.y = square.y;

    this.element.style.transform = `translate(${square.x * 50}px, ${
      square.y * 50
    }px)`;
  }

  getValidMoves() {
    return [];
  }
}
