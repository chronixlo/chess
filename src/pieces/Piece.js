export default class Piece {
  x = null;
  y = null;
  element = null;

  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }

  move(square) {
    this.x = square.x;
    this.y = square.y;

    this.element.style.transform =
      "translate(" + square.x * 50 + "px, " + square.y * 50 + "px)";
  }

  getValidMoves() {
    return [];
  }
}
