import gameState from "../gameState";
import { isInside } from "../utils";
import Piece from "./Piece";

export default class King extends Piece {
  type = "king";

  move(square) {
    const deltaX = square.x - this.x;

    // kingside
    if (deltaX === 2) {
      const rook = gameState.whitePieces.find(
        (piece) => piece.x === 7 && piece.y === 7
      );
      rook.move({ x: rook.y - 2, y: rook.y });
    }
    // queenside
    if (deltaX === -2) {
      const rook = gameState.whitePieces.find(
        (piece) => piece.x === 0 && piece.y === 7
      );
      rook.move({ x: rook.x + 3, y: rook.y });
    }

    super.move(square);

    gameState.canWhiteCastleKingside = false;
    gameState.canWhiteCastleQueenside = false;
  }

  getValidMoves() {
    const squares = [];

    // normal moves
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (i === 0 && j === 0) {
          continue;
        }
        squares.push({ x: this.x + i, y: this.y + j });
      }
    }

    // castles
    if (gameState.canWhiteCastleQueenside) {
      squares.push({ x: this.x - 2, y: this.y });
    }
    if (gameState.canWhiteCastleKingside) {
      squares.push({ x: this.x + 2, y: this.y });
    }

    return squares.filter(isInside).filter((square) => {
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
