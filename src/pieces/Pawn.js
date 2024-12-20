import Piece from "./Piece";
import pawn from "../images/pawn.svg?raw";

export default class Pawn extends Piece {
  type = "pawn";

  constructor(props) {
    super(props);

    this.element.innerHTML = pawn;
  }

  getValidMoves() {
    const moves = [];

    const possibleMoves =
      this.color === "white"
        ? [
            ...(this.y !== 0 ? [{ x: this.x, y: this.y - 1 }] : []),
            ...(this.y === 6 ? [{ x: this.x, y: this.y - 2 }] : []),
          ]
        : [
            ...(this.y !== 7 ? [{ x: this.x, y: this.y + 1 }] : []),
            ...(this.y === 1 ? [{ x: this.x, y: this.y + 2 }] : []),
          ];

    const possibleCaptures =
      this.color === "white"
        ? [
            { x: this.x - 1, y: this.y - 1 },
            { x: this.x + 1, y: this.y - 1 },
          ]
        : [
            { x: this.x - 1, y: this.y + 1 },
            { x: this.x + 1, y: this.y + 1 },
          ];

    moves.push(
      ...possibleMoves.filter((square) => {
        const isOccupied = [...this.opposingPieces, ...this.ownPieces].some(
          (piece) => piece.x === square.x && piece.y === square.y
        );

        if (isOccupied) {
          return false;
        }

        return true;
      })
    );

    moves.push(
      ...possibleCaptures.filter((square) => {
        const occupyingPiece = this.opposingPieces.find(
          (piece) => piece.x === square.x && piece.y === square.y
        );

        if (!occupyingPiece) {
          return false;
        }

        return true;
      })
    );

    return moves;
  }
}
