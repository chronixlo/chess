import { BOARD_SIZE } from "../consts";
import { isInside } from "../utils";
import Piece from "./Piece";
import queen from "../images/queen.svg?raw";

export default class Queen extends Piece {
  type = "queen";

  constructor(props) {
    super(props);

    this.element.innerHTML = queen;
  }

  getValidMoves() {
    const squares = [];

    // -x
    for (let i = 1; i < BOARD_SIZE; i++) {
      const square = { x: this.x - i, y: this.y };

      if (!isInside(square)) {
        break;
      }

      if (
        this.ownPieces.some(
          (piece) => piece.x === square.x && piece.y === square.y
        )
      ) {
        break;
      }

      squares.push(square);

      if (
        this.opposingPieces.some(
          (piece) => piece.x === square.x && piece.y === square.y
        )
      ) {
        break;
      }
    }

    // -y
    for (let i = 1; i < BOARD_SIZE; i++) {
      const square = { x: this.x, y: this.y - i };

      if (!isInside(square)) {
        break;
      }

      if (
        this.ownPieces.some(
          (piece) => piece.x === square.x && piece.y === square.y
        )
      ) {
        break;
      }

      squares.push(square);

      if (
        this.opposingPieces.some(
          (piece) => piece.x === square.x && piece.y === square.y
        )
      ) {
        break;
      }
    }

    // +x
    for (let i = 1; i < BOARD_SIZE; i++) {
      const square = { x: this.x + i, y: this.y };

      if (!isInside(square)) {
        break;
      }

      if (
        this.ownPieces.some(
          (piece) => piece.x === square.x && piece.y === square.y
        )
      ) {
        break;
      }

      squares.push(square);

      if (
        this.opposingPieces.some(
          (piece) => piece.x === square.x && piece.y === square.y
        )
      ) {
        break;
      }
    }

    // +y
    for (let i = 1; i < BOARD_SIZE; i++) {
      const square = { x: this.x, y: this.y + i };

      if (!isInside(square)) {
        break;
      }

      if (
        this.ownPieces.some(
          (piece) => piece.x === square.x && piece.y === square.y
        )
      ) {
        break;
      }

      squares.push(square);

      if (
        this.opposingPieces.some(
          (piece) => piece.x === square.x && piece.y === square.y
        )
      ) {
        break;
      }
    }

    // -x
    for (let i = 1; i < BOARD_SIZE; i++) {
      const square = { x: this.x - i, y: this.y - i };

      if (!isInside(square)) {
        break;
      }

      if (
        this.ownPieces.some(
          (piece) => piece.x === square.x && piece.y === square.y
        )
      ) {
        break;
      }

      squares.push(square);

      if (
        this.opposingPieces.some(
          (piece) => piece.x === square.x && piece.y === square.y
        )
      ) {
        break;
      }
    }

    // -y
    for (let i = 1; i < BOARD_SIZE; i++) {
      const square = { x: this.x + i, y: this.y - i };

      if (!isInside(square)) {
        break;
      }

      if (
        this.ownPieces.some(
          (piece) => piece.x === square.x && piece.y === square.y
        )
      ) {
        break;
      }

      squares.push(square);

      if (
        this.opposingPieces.some(
          (piece) => piece.x === square.x && piece.y === square.y
        )
      ) {
        break;
      }
    }

    // +x
    for (let i = 1; i < BOARD_SIZE; i++) {
      const square = { x: this.x + i, y: this.y + i };

      if (!isInside(square)) {
        break;
      }

      if (
        this.ownPieces.some(
          (piece) => piece.x === square.x && piece.y === square.y
        )
      ) {
        break;
      }

      squares.push(square);

      if (
        this.opposingPieces.some(
          (piece) => piece.x === square.x && piece.y === square.y
        )
      ) {
        break;
      }
    }

    // +y
    for (let i = 1; i < BOARD_SIZE; i++) {
      const square = { x: this.x - i, y: this.y + i };

      if (!isInside(square)) {
        break;
      }

      if (
        this.ownPieces.some(
          (piece) => piece.x === square.x && piece.y === square.y
        )
      ) {
        break;
      }

      squares.push(square);

      if (
        this.opposingPieces.some(
          (piece) => piece.x === square.x && piece.y === square.y
        )
      ) {
        break;
      }
    }

    return squares.filter((square) => {
      const isOccupied = this.ownPieces.some(
        (piece) => piece.x === square.x && piece.y === square.y
      );

      if (isOccupied) {
        return false;
      }

      return true;
    });
  }
}
