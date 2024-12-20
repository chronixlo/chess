import { isInside } from "../utils";
import Piece from "./Piece";
import knight from "../images/knight.svg?raw";

export default class Knight extends Piece {
  type = "knight";

  constructor(props) {
    super(props);

    this.element.innerHTML = knight;
  }

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
        const isOccupied = this.ownPieces.some(
          (piece) => piece.x === square.x && piece.y === square.y
        );

        if (isOccupied) {
          return false;
        }

        return true;
      });
  };
}
