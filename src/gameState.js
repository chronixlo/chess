import { BOARD_SIZE } from "./consts";
import { getValidMoves } from "./utils";

const filledPieceCharacters = {
  b: "♝",
  q: "♛",
  r: "♜",
  k: "♚",
  p: "♟",
  n: "♞",
};

export class Game {
  turn = 0;

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
  // gameMode = "1v1";

  sim = false;

  constructor(props) {
    this.clickLayer = document.querySelector("#click-layer");
    this.piecesElement = document.querySelector("#pieces");
    this.cellsElement = document.querySelector("#cells");
    this.statusText = document.querySelector("#status-text");

    this.sim = props.sim;
    this.board = props.board.split("\n").map((r) => r.split(","));
    this.turn = props.turn;

    this.canWhiteCastleQueenside = props.canWhiteCastleQueenside ?? true;
    this.canWhiteCastleKingside = props.canWhiteCastleKingside ?? true;
    this.canBlackCastleQueenside = props.canBlackCastleQueenside ?? true;
    this.canBlackCastleKingside = props.canBlackCastleKingside ?? true;
    this.whiteChecked = props.whiteChecked ?? false;
    this.blackChecked = props.blackChecked ?? false;
    this.whiteEnPassant = props.whiteEnPassant;
    this.blackEnPassant = props.blackEnPassant;

    this.init();
  }

  init() {
    if (!this.sim) {
      this.setStatusText("White to move");

      this.render();
    }
  }

  updateChecked() {
    this.blackChecked = false;
    this.whiteChecked = false;

    if (!this.sim) {
      this.cellsElement
        .querySelectorAll(".check")
        .forEach((tile) => tile.classList.remove("check"));
    }

    let blackKing;

    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        if (this.board[y][x] === "bk") {
          blackKing = {
            x,
            y,
          };
          break;
        }
      }
    }

    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        if (this.board[y][x]?.[0] === "w") {
          const moves = getValidMoves(
            this,
            {
              x,
              y,
            },
            this.board[y][x]
          );

          if (
            moves.some(
              (square) => square.x === blackKing.x && square.y === blackKing.y
            )
          ) {
            this.blackChecked = true;
            break;
          }
        }
      }
    }

    if (!this.sim && this.blackChecked) {
      const blackKingSquare = this.cellsElement.querySelector(
        `.cell-${blackKing.x}-${blackKing.y}`
      );
      blackKingSquare.classList.add("check");
    }

    //

    let whiteKing;

    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        if (this.board[y][x] === "wk") {
          whiteKing = {
            x,
            y,
          };
          break;
        }
      }
    }

    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        if (this.board[y][x]?.[0] === "b") {
          const moves = getValidMoves(
            this,
            {
              x,
              y,
            },
            this.board[y][x]
          );

          if (
            moves.some(
              (square) => square.x === whiteKing.x && square.y === whiteKing.y
            )
          ) {
            this.whiteChecked = true;
            break;
          }
        }
      }
    }

    if (!this.sim && this.whiteChecked) {
      const whiteKingSquare = this.cellsElement.querySelector(
        `.cell-${whiteKing.x}-${whiteKing.y}`
      );
      whiteKingSquare.classList.add("check");
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
    if (movingPiece === "wp" && deltaY === -2 && toSquare.y === 4) {
      this.whiteEnPassant = { x: toSquare.x, y: toSquare.y + 1 };
    } else if (movingPiece === "bp" && deltaY === 2 && toSquare.y === 3) {
      this.blackEnPassant = { x: toSquare.x, y: toSquare.y - 1 };
    }

    // promotion
    if (movingPiece === "wp" && toSquare.y === 0) {
      this.board[toSquare.y][toSquare.x] = "wq";
    } else if (movingPiece === "bp" && toSquare.y === 7) {
      this.board[toSquare.y][toSquare.x] = "bq";
    }

    if (!this.sim) {
      this.cellsElement
        .querySelector(".last-move-from")
        ?.classList.remove("last-move-from");
      this.cellsElement
        .querySelector(".last-move-to")
        ?.classList.remove("last-move-to");

      const fromSquareElement = this.cellsElement.querySelector(
        `.cell-${fromSquare.x}-${fromSquare.y}`
      );
      fromSquareElement.classList.add("last-move-from");

      const targetSquare = this.cellsElement.querySelector(
        `.cell-${toSquare.x}-${toSquare.y}`
      );
      targetSquare.classList.add("last-move-to");
    }
  }

  endTurn() {
    this.turn = 1 - this.turn;

    if (!this.sim) {
      this.setStatusText((this.turn === 0 ? "White" : "Black") + " to move");
      this.render();
    }

    this.updateChecked();

    if (!this.sim) {
      console.log(this);
    }
  }

  render() {
    this.piecesElement.innerHTML = "";

    this.board.forEach((rank, y) => {
      rank.forEach((square, x) => {
        if (square !== "") {
          const element = document.createElement("div");
          element.classList.add("piece", square[0] === "w" ? "white" : "black");
          element.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
          element.textContent = filledPieceCharacters[square[1]];

          this.piecesElement.appendChild(element);
        }
      });
    });
  }

  setStatusText(text) {
    this.statusText.textContent = text;
  }

  setGameMode(mode) {
    this.gameMode = mode;
    this.init();
  }

  getBoardString() {
    return this.board.map((rank) => rank.join(",")).join("\n");
  }
}

export default new Game({
  board: `br,bn,bb,bq,bk,bb,bn,br
bp,bp,bp,bp,bp,bp,bp,bp
,,,,,,,
,,,,,,,
,,,,,,,
,,,,,,,
wp,wp,wp,wp,wp,wp,wp,wp
wr,wn,wb,wq,wk,wb,wn,wr`,
  turn: 0,
});

`br,bn,bb,bq,bk,bb,bn,br
bp,bp,bp,bp,bp,bp,bp,bp
,,,,,,,
,,,,,,,
,,,,,,,
,,,,,,,
wp,wp,wp,wp,wp,wp,wp,wp
wr,wn,wb,wq,wk,wb,wn,wr`;
