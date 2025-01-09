import { BOARD_SIZE, PIECE_CHARACTERS } from "./consts";
import { doCpuMove } from "./cpu";
import Game from "./Game";

export class App {
  gameState = null;

  clickLayer = null;
  piecesElement = null;
  cellsElement = null;
  statusText = null;
  gameMode = "cpu";
  // gameMode = "cvc";
  // gameMode = "1v1";

  constructor() {
    this.clickLayer = document.querySelector("#click-layer");
    this.piecesElement = document.querySelector("#pieces");
    this.cellsElement = document.querySelector("#cells");
    this.statusText = document.querySelector("#status-text");
    this.oneOnOneButton = document.querySelector("#oneOnOne");
    this.cpuButton = document.querySelector("#cpu");
    this.cvcButton = document.querySelector("#cvc");

    this.oneOnOneButton.addEventListener("click", () =>
      this.setGameMode("1v1")
    );
    this.cpuButton.addEventListener("click", () => this.setGameMode("cpu"));
    this.cvcButton.addEventListener("click", () => this.setGameMode("cvc"));

    this.setGameMode("cpu");
  }

  init() {
    this.gameState = new Game({
      board: `br,bn,bb,bq,bk,bb,bn,br
bp,bp,bp,bp,bp,bp,bp,bp
,,,,,,,
,,,,,,,
,,,,,,,
,,,,,,,
wp,wp,wp,wp,wp,wp,wp,wp
wr,wn,wb,wq,wk,wb,wn,wr`,
      onEndTurn: this.onEndTurn,
      onMove: this.onMove,
    });

    this.updateStatus();
    this.render();

    this.cellsElement
      .querySelector(".last-move-from")
      ?.classList.remove("last-move-from");
    this.cellsElement
      .querySelector(".last-move-to")
      ?.classList.remove("last-move-to");
    this.cellsElement
      .querySelectorAll(".check")
      .forEach((tile) => tile.classList.remove("check"));

    if (this.gameMode === "cvc") {
      setTimeout(() => {
        doCpuMove(this.gameState, this.gameState.turn === 0 ? "w" : "b", 2);
      }, 100);
    }
  }

  onEndTurn = () => {
    this.updateStatus();
    this.render();

    this.cellsElement
      .querySelectorAll(".check")
      .forEach((tile) => tile.classList.remove("check"));

    if (this.gameState.blackChecked) {
      let blackKing;

      for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
          if (this.gameState.board[y][x] === "bk") {
            blackKing = {
              x,
              y,
            };
            break;
          }
        }
      }

      const blackKingSquare = this.cellsElement.querySelector(
        `.cell-${blackKing.x}-${blackKing.y}`
      );
      blackKingSquare.classList.add("check");
    }

    if (this.gameState.whiteChecked) {
      let whiteKing;

      for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
          if (this.gameState.board[y][x] === "wk") {
            whiteKing = {
              x,
              y,
            };
            break;
          }
        }
      }
      const whiteKingSquare = this.cellsElement.querySelector(
        `.cell-${whiteKing.x}-${whiteKing.y}`
      );
      whiteKingSquare.classList.add("check");
    }

    setTimeout(() => {
      if (this.gameState.turn === 1 && this.gameMode === "cpu") {
        doCpuMove(this.gameState, "b", 2);
      } else if (this.gameMode === "cvc") {
        doCpuMove(this.gameState, this.gameState.turn === 0 ? "w" : "b", 2);
      }
    }, 100);
  };

  onMove = (fromSquare, toSquare) => {
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
  };

  render() {
    this.piecesElement.innerHTML = "";

    this.gameState.board.forEach((rank, y) => {
      rank.forEach((square, x) => {
        if (square !== "") {
          const element = document.createElement("div");
          element.classList.add("piece", square[0] === "w" ? "white" : "black");
          element.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
          element.textContent = PIECE_CHARACTERS[square[1]];

          this.piecesElement.appendChild(element);
        }
      });
    });
  }

  updateStatus() {
    let text;

    if (this.gameMode === "1v1") {
      text = (this.gameState.turn === 0 ? "White" : "Black") + " to move";
    } else if (this.gameMode === "cpu") {
      text = this.gameState.turn === 0 ? "White to move" : "Thinking...";
    } else {
      text = "Thinking...";
    }

    this.statusText.textContent = text;
  }

  setGameMode(mode) {
    this.gameMode = mode;
    this.init();

    let selected;
    if (mode === "cpu") {
      selected = this.cpuButton;
    } else if (mode === "1v1") {
      selected = this.oneOnOneButton;
    } else if (mode === "cvc") {
      selected = this.cvcButton;
    }

    [this.cpuButton, this.oneOnOneButton, this.cvcButton].forEach((el) =>
      el.classList.remove("selected")
    );

    selected.classList.add("selected");
  }

  getBoardString() {
    return this.board.map((rank) => rank.join(",")).join("\n");
  }
}

export default new App();
