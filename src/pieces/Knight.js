import gameState from "../gameState";
import { isInside } from "../utils";
import Piece from "./Piece";

export default class Knight extends Piece {
  type = "knight";

  getValidMoves = () => {
    const squares = [
      { x: this.x + 1, y: this.y + 2 },
      { x: this.x + 2, y: this.y + 1 },
      { x: this.x - 1, y: this.y + 2 },
      { x: this.x - 2, y: this.y + 1 },
      { x: this.x + 1, y: this.y - 2 },
      { x: this.x + 2, y: this.y - 1 },
      { x: this.x - 1, y: this.y - 2 },
      { x: this.x - 2, y: this.y - 1 },
    ];

    return squares
      .filter((square) => isInside(square))
      .filter((square) => {
        const isOccupied = gameState.whitePieces.some(
          (piece) => piece.x === square.x && piece.y === square.y
        );

        if (isOccupied) {
          return false;
        }

        return true;
      });
  };
}
