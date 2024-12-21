import { BOARD_SIZE } from "../consts";
import gameState from "../gameState";
import { isInside } from "../utils";
import Piece from "./Piece";
import rook from "../images/rook.svg?raw";

export default class Rook extends Piece {
  type = "rook";
  file = null;

  constructor(props) {
    super(props);

    this.file = props.x;
    this.element.innerHTML = rook;
  }

  move(square) {
    super.move(square);

    if (this.file === 0) {
      if (this.color === "white") {
        gameState.canWhiteCastleQueenside = false;
      } else {
        gameState.canBlackCastleQueenside = false;
      }
    }
    if (this.file === 7) {
      if (this.color === "white") {
        gameState.canWhiteCastleKingside = false;
      } else {
        gameState.canBlackCastleKingside = false;
      }
    }
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
        this.enemyPieces.some(
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
        this.enemyPieces.some(
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
        this.enemyPieces.some(
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
        this.enemyPieces.some(
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
