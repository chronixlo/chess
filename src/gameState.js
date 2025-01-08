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

    this.init();
  }

  init() {
    if (!this.sim) {
      this.setStatusText("White to move");

      this.render();
    }
  }

  updateChecked() {
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
