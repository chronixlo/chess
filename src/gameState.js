import { BOARD_SIZE } from "./consts";
import Bishop from "./pieces/Bishop";
import King from "./pieces/King";
import Knight from "./pieces/Knight";
import Pawn from "./pieces/Pawn";
import Queen from "./pieces/Queen";
import Rook from "./pieces/Rook";

class Game {
  turn = 0;

  whitePieces = [];
  blackPieces = [];

  canWhiteCastleQueenside = true;
  canWhiteCastleKingside = true;
  canBlackCastleQueenside = true;
  canBlacCastleKingside = true;

  clickLayer = null;
  piecesElement = null;
  cellsElement = null;
  statusText = null;
  gameMode = "cpu";

  constructor() {
    this.clickLayer = document.querySelector("#click-layer");
    this.piecesElement = document.querySelector("#pieces");
    this.cellsElement = document.querySelector("#cells");
    this.statusText = document.querySelector("#status-text");

    this.init();
  }

  init() {
    this.setStatusText("White to move");

    this.whitePieces = [
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
    ];

    this.blackPieces = [
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
    ];

    this.whitePieces.forEach((piece) =>
      this.piecesElement.appendChild(piece.element)
    );
    this.blackPieces.forEach((piece) =>
      this.piecesElement.appendChild(piece.element)
    );
  }

  endTurn() {
    this.turn = 1 - this.turn;

    this.setStatusText((this.turn === 0 ? "White" : "Black") + " to move");
  }

  setStatusText(text) {
    this.statusText.textContent = text;
  }

  setGameMode(mode) {
    this.gameMode = mode;
    this.init();
  }
}

export default new Game();
