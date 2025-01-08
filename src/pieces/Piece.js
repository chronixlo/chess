import { resultsInCheck } from "../utils";

export default class Piece {
  x = null;
  y = null;
  element = null;
  color = null;
  type = null;
  gameState = null;

  constructor({ x, y, color }) {
    this.x = x;
    this.y = y;
    this.color = color;

    const element = document.createElement("div");
    element.classList.add("piece", this.color);
    element.style.transform = `translate(${this.x * 50}px, ${this.y * 50}px)`;

    this.element = element;
  }

  move(square) {
    this.gameState.cellsElement
      .querySelector(".last-move-from")
      ?.classList.remove("last-move-from");
    this.gameState.cellsElement
      .querySelector(".last-move-to")
      ?.classList.remove("last-move-to");

    const fromSquare = this.gameState.cellsElement.querySelector(
      `.cell-${this.x}-${this.y}`
    );
    fromSquare.classList.add("last-move-from");

    this.x = square.x;
    this.y = square.y;

    this.element.style.transform = `translate(${square.x * 50}px, ${
      square.y * 50
    }px)`;

    const targetSquare = this.gameState.cellsElement.querySelector(
      `.cell-${square.x}-${square.y}`
    );
    targetSquare.classList.add("last-move-to");

    const capturedPieceIndex = this.enemyPieces.findIndex(
      (piece) => piece.x === square.x && piece.y === square.y
    );

    if (capturedPieceIndex !== -1) {
      this.enemyPieces[capturedPieceIndex].element.parentNode.removeChild(
        this.enemyPieces[capturedPieceIndex].element
      );
      this.enemyPieces.splice(capturedPieceIndex, 1);
    }

    this.gameState.updateChecked();
  }

  getValidMoves() {
    return [];
  }

  getValidMovesNoCheck() {
    return this.getValidMoves().filter((square) =>
      resultsInCheck(this, square)
    );
  }

  get ownPieces() {
    return this.color === "white"
      ? this.gameState.whitePieces
      : this.gameState.blackPieces;
  }

  get enemyPieces() {
    return this.color === "black"
      ? this.gameState.whitePieces
      : this.gameState.blackPieces;
  }
}
