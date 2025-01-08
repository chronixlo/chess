import { BOARD_SIZE } from "./consts";
import Bishop from "./pieces/Bishop";
import King from "./pieces/King";
import Knight from "./pieces/Knight";
import Pawn from "./pieces/Pawn";
import Queen from "./pieces/Queen";
import Rook from "./pieces/Rook";

export class Game {
  turn = 0;

  whitePieces = [];
  blackPieces = [];

  canWhiteCastleQueenside = true;
  canWhiteCastleKingside = true;

  canBlackCastleQueenside = true;
  canBlackCastleKingside = true;

  whiteChecked = false;
  blackChecked = false;

  clickLayer = null;
  piecesElement = null;
  cellsElement = null;
  statusText = null;
  // gameMode = "cpu";
  gameMode = "1v1";

  sim = false;

  constructor(whitePieces, blackPieces, turn, sim = true) {
    this.clickLayer = document.querySelector("#click-layer");
    this.piecesElement = document.querySelector("#pieces");
    this.cellsElement = document.querySelector("#cells");
    this.statusText = document.querySelector("#status-text");

    this.sim = sim;

    this.init(whitePieces, blackPieces, turn);
  }

  init(whitePieces, blackPieces, turn) {
    if (!this.sim) {
      this.setStatusText("White to move");
    }

    this.whitePieces = whitePieces;
    this.blackPieces = blackPieces;
    this.turn = turn;

    this.whitePieces.forEach((p) => (p.gameState = this));
    this.blackPieces.forEach((p) => (p.gameState = this));

    if (!this.sim) {
      this.whitePieces.forEach((piece) =>
        this.piecesElement.appendChild(piece.element)
      );
      this.blackPieces.forEach((piece) =>
        this.piecesElement.appendChild(piece.element)
      );
    }
  }

  updateChecked() {
    const blackKing = this.blackPieces.find((p) => p.type === "king");
    this.blackChecked = this.whitePieces.some((piece) => {
      const moves = piece.getValidMoves();
      return moves.some(
        (square) => square.x === blackKing.x && square.y === blackKing.y
      );
    });

    if (!this.sim && this.blackChecked) {
      const blackKingSquare = this.cellsElement.querySelector(
        `.cell-${blackKing.x}-${blackKing.y}`
      );
      blackKingSquare.classList.add("check");
    }

    const whiteKing = this.whitePieces.find((p) => p.type === "king");
    this.whiteChecked = this.blackPieces.some((piece) => {
      const moves = piece.getValidMoves();
      return moves.some(
        (square) => square.x === whiteKing.x && square.y === whiteKing.y
      );
    });

    if (!this.sim && this.whiteChecked) {
      const whiteKingSquare = this.cellsElement.querySelector(
        `.cell-${whiteKing.x}-${whiteKing.y}`
      );
      whiteKingSquare.classList.add("check");
    }
  }

  endTurn() {
    this.turn = 1 - this.turn;

    if (!this.sim) {
      this.setStatusText((this.turn === 0 ? "White" : "Black") + " to move");
    }
  }

  setStatusText(text) {
    this.statusText.textContent = text;
  }

  setGameMode(mode) {
    this.gameMode = mode;
    this.init();
  }
}

export default new Game(
  [
    ...new Array(BOARD_SIZE)
      .fill(null)
      .map((_, idx) => new Pawn({ x: idx, y: 6, color: "white" })),
    new Rook({ x: 0, y: 7, color: "white" }),
    new Rook({ x: 7, y: 7, color: "white" }),
    new Knight({ x: 1, y: 7, color: "white" }),
    new Knight({ x: 6, y: 7, color: "white" }),
    new Bishop({ x: 2, y: 7, color: "white" }),
    new Bishop({ x: 5, y: 7, color: "white" }),
    new Queen({ x: 3, y: 7, color: "white" }),
    new King({ x: 4, y: 7, color: "white" }),
  ],

  [
    ...new Array(BOARD_SIZE)
      .fill(null)
      .map((_, idx) => new Pawn({ x: idx, y: 1, color: "black" })),
    new Rook({ x: 0, y: 0, color: "black" }),
    new Rook({ x: 7, y: 0, color: "black" }),
    new Knight({ x: 1, y: 0, color: "black" }),
    new Knight({ x: 6, y: 0, color: "black" }),
    new Bishop({ x: 2, y: 0, color: "black" }),
    new Bishop({ x: 5, y: 0, color: "black" }),
    new Queen({ x: 3, y: 0, color: "black" }),
    new King({ x: 4, y: 0, color: "black" }),
  ],
  0,
  false
);
