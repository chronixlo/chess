import Piece from "./Piece";
import gameState from "../gameState";

export default class Pawn extends Piece {
  type = "pawn";

  getValidMoves() {
    const moves = [];

    const possibleMoves = [
      ...(this.y !== 0 ? [{ x: this.x, y: this.y - 1 }] : []),
      ...(this.y === 6 ? [{ x: this.x, y: this.y - 2 }] : []),
    ];

    const possibleCaptures = [
      { x: this.x - 1, y: this.y - 1 },
      { x: this.x + 1, y: this.y - 1 },
    ];

    moves.push(
      ...possibleMoves.filter((square) => {
        const isOccupied = [
          ...gameState.blackPieces,
          ...gameState.whitePieces,
        ].some((piece) => piece.x === square.x && piece.y === square.y);

        if (isOccupied) {
          return false;
        }

        return true;
      })
    );

    moves.push(
      ...possibleCaptures.filter((square) => {
        const occupyingPiece = gameState.blackPieces.find(
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
