import { BOARD_SIZE } from "../consts";
import gameState from "../gameState";
import { isInside } from "../utils";
import Piece from "./Piece";
import bishop from "../images/bishop.svg?raw";

export default class Bishop extends Piece {
  type = "bishop";

  constructor(props) {
    super(props);

    this.element.innerHTML = bishop;
  }

  getValidMoves() {
    const squares = [];

    // -x
    for (let i = 1; i < BOARD_SIZE; i++) {
      const square = { x: this.x - i, y: this.y - i };

      if (!isInside(square)) {
        break;
      }

      if (
        gameState.whitePieces.some(
          (piece) => piece.x === square.x && piece.y === square.y
        )
      ) {
        break;
      }

      squares.push(square);

      if (
        gameState.blackPieces.some(
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
        gameState.whitePieces.some(
          (piece) => piece.x === square.x && piece.y === square.y
        )
      ) {
        break;
      }

      squares.push(square);

      if (
        gameState.blackPieces.some(
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
        gameState.whitePieces.some(
          (piece) => piece.x === square.x && piece.y === square.y
        )
      ) {
        break;
      }

      squares.push(square);

      if (
        gameState.blackPieces.some(
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
        gameState.whitePieces.some(
          (piece) => piece.x === square.x && piece.y === square.y
        )
      ) {
        break;
      }

      squares.push(square);

      if (
        gameState.blackPieces.some(
          (piece) => piece.x === square.x && piece.y === square.y
        )
      ) {
        break;
      }
    }

    return squares.filter((square) => {
      const isOccupied = gameState.whitePieces.some(
        (piece) => piece.x === square.x && piece.y === square.y
      );

      if (isOccupied) {
        return false;
      }

      return true;
    });
  }
}
