import gameState from "../gameState";

export default class Piece {
  x = null;
  y = null;
  element = null;
  color = null;
  type = null;

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
    gameState.cellsElement
      .querySelector(".last-move-from")
      ?.classList.remove("last-move-from");
    gameState.cellsElement
      .querySelector(".last-move-to")
      ?.classList.remove("last-move-to");

    const fromSquare = gameState.cellsElement.querySelector(
      `.cell-${this.x}-${this.y}`
    );
    fromSquare.classList.add("last-move-from");

    this.x = square.x;
    this.y = square.y;

    this.element.style.transform = `translate(${square.x * 50}px, ${
      square.y * 50
    }px)`;

    const targetSquare = gameState.cellsElement.querySelector(
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

    const enemyKing = this.enemyPieces.find((p) => p.type === "king");
    const isCheck = this.ownPieces.some((piece) => {
      const moves = piece.getValidMoves();
      return moves.some(
        (square) => square.x === enemyKing.x && square.y === enemyKing.y
      );
    });

    if (isCheck) {
      gameState.blackChecked = true;
      const kingSquare = gameState.cellsElement.querySelector(
        `.cell-${enemyKing.x}-${enemyKing.y}`
      );
      kingSquare.classList.add("check");
    }
  }

  getValidMoves() {
    return [];
  }

  get ownPieces() {
    return this.color === "white"
      ? gameState.whitePieces
      : gameState.blackPieces;
  }

  get enemyPieces() {
    return this.color === "black"
      ? gameState.whitePieces
      : gameState.blackPieces;
  }
}
