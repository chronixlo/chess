import { canBeCaptured, getPieceSquare } from "./utils";

export default class Game {
  turn = 0;
  moves = 0;

  // 'w' | 'b' | 'draw'
  result = null;

  canWhiteCastleQueenside = true;
  canWhiteCastleKingside = true;

  canBlackCastleQueenside = true;
  canBlackCastleKingside = true;

  whiteChecked = false;
  blackChecked = false;

  whiteEnPassant = null;
  blackEnPassant = null;

  clickLayer = null;
  piecesElement = null;
  cellsElement = null;
  statusText = null;
  gameMode = "cpu";
  // gameMode = "cvc";
  // gameMode = "1v1";

  onEndTurn = null;
  onMove = null;

  constructor(props) {
    this.board = props.board.map((r) => [...r]);
    this.turn = props.turn ?? 0;
    this.moves = props.moves ?? 0;

    this.canWhiteCastleQueenside = props.canWhiteCastleQueenside ?? true;
    this.canWhiteCastleKingside = props.canWhiteCastleKingside ?? true;
    this.canBlackCastleQueenside = props.canBlackCastleQueenside ?? true;
    this.canBlackCastleKingside = props.canBlackCastleKingside ?? true;
    this.whiteChecked = props.whiteChecked ?? false;
    this.blackChecked = props.blackChecked ?? false;
    this.whiteEnPassant = props.whiteEnPassant;
    this.blackEnPassant = props.blackEnPassant;

    this.onEndTurn = props.onEndTurn;
    this.onMove = props.onMove;
  }

  updateChecked() {
    this.blackChecked = false;
    this.whiteChecked = false;

    const color = this.turn === 0 ? "w" : "b";
    const king = getPieceSquare(this, color + "k");

    if (!king) {
      return;
    }

    if (canBeCaptured(this, king, color, false)) {
      if (color === "b") {
        this.blackChecked = true;
      } else {
        this.whiteChecked = true;
      }
    }
  }

  move(fromSquare, toSquare) {
    const movingPiece = this.board[fromSquare.y][fromSquare.x];

    if (movingPiece === "wk") {
      const deltaX = toSquare.x - fromSquare.x;

      // kingside castle
      if (deltaX === 2) {
        const rook = {
          x: 7,
          y: 7,
        };
        this.move(rook, { x: rook.x - 2, y: rook.y });
      }
      // queenside castle
      if (deltaX === -2) {
        const rook = {
          x: 0,
          y: 7,
        };
        this.move(rook, { x: rook.x + 3, y: rook.y });
      }

      this.canWhiteCastleQueenside = false;
      this.canWhiteCastleKingside = false;
    } else if (movingPiece === "bk") {
      const deltaX = toSquare.x - fromSquare.x;

      // kingside castle
      if (deltaX === 2) {
        const rook = {
          x: 7,
          y: 0,
        };
        this.move(rook, { x: rook.x - 2, y: rook.y });
      }
      // queenside castle
      if (deltaX === -2) {
        const rook = {
          x: 0,
          y: 0,
        };
        this.move(rook, { x: rook.x + 3, y: rook.y });
      }

      this.canBlackCastleQueenside = false;
      this.canBlackCastleKingside = false;
    }

    if (movingPiece === "wr") {
      if (this.canWhiteCastleQueenside && fromSquare.x === 0) {
        this.canWhiteCastleQueenside = false;
      } else if (this.canWhiteCastleKingside && fromSquare.x === 7) {
        this.canWhiteCastleKingside = false;
      }
    } else if (movingPiece === "br") {
      if (this.canBlackCastleQueenside && fromSquare.x === 0) {
        this.canBlackCastleQueenside = false;
      } else if (this.canBlackCastleKingside && fromSquare.x === 7) {
        this.canBlackCastleKingside = false;
      }
    }

    this.board[toSquare.y][toSquare.x] = this.board[fromSquare.y][fromSquare.x];
    this.board[fromSquare.y][fromSquare.x] = "";

    const deltaY = toSquare.y - fromSquare.y;

    // en passant capture
    if (
      movingPiece === "wp" &&
      toSquare.x === this.blackEnPassant?.x &&
      toSquare.y === this.blackEnPassant?.y
    ) {
      this.board[this.blackEnPassant.y + 1][this.blackEnPassant.x] = "";
    } else if (
      movingPiece === "bp" &&
      toSquare.x === this.whiteEnPassant?.x &&
      toSquare.y === this.whiteEnPassant?.y
    ) {
      this.board[this.whiteEnPassant.y - 1][this.whiteEnPassant.x] = "";
    }

    this.blackEnPassant = null;
    this.whiteEnPassant = null;

    // allow en passant
    if (movingPiece === "wp" && deltaY === -2) {
      this.whiteEnPassant = { x: toSquare.x, y: toSquare.y + 1 };
    } else if (movingPiece === "bp" && deltaY === 2) {
      this.blackEnPassant = { x: toSquare.x, y: toSquare.y - 1 };
    }

    // promotion
    if (movingPiece === "wp" && toSquare.y === 0) {
      this.board[toSquare.y][toSquare.x] = "wq";
    } else if (movingPiece === "bp" && toSquare.y === 7) {
      this.board[toSquare.y][toSquare.x] = "bq";
    }

    if (this.onMove) {
      this.onMove(fromSquare, toSquare);
    }
  }

  endTurn() {
    this.turn = 1 - this.turn;
    this.moves++;

    this.updateChecked();

    if (this.onEndTurn) {
      this.onEndTurn();
    }
  }
}
