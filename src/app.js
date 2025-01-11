import { INITIAL_BOARD, PIECE_CHARACTERS } from "./consts";
import { doCpuMove } from "./cpu";
import Game from "./Game";
import { getPieceSquare, toShort } from "./utils";

const cpuDepth = 2;

export class App {
  gameState = null;

  clickLayer = null;
  piecesElement = null;
  cellsElement = null;
  statusText = null;
  gameMode = "cpu"; // cpu | cvc | 1v1

  constructor() {
    this.clickLayer = document.querySelector("#click-layer");
    this.piecesElement = document.querySelector("#pieces");
    this.cellsElement = document.querySelector("#cells");
    this.statusText = document.querySelector("#status-text");
    this.calculationsText = document.querySelector("#calculations");
    this.moveText = document.querySelector("#move");
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
      board: INITIAL_BOARD,
      onEndTurn: this.onEndTurn,
      onMove: this.onMove,
    });

    this.updateStatus();
    this.render();
    this.calculationsText.innerHTML = "&nbsp;";

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
      this.doCpuMove();
    }
  }

  onEndTurn = () => {
    this.updateStatus();
    this.render();

    this.cellsElement
      .querySelectorAll(".check")
      .forEach((tile) => tile.classList.remove("check"));

    if (this.gameState.blackChecked) {
      const blackKing = getPieceSquare(this.gameState, "bk");

      const blackKingSquare = this.cellsElement.querySelector(
        `.cell-${blackKing.x}-${blackKing.y}`
      );
      blackKingSquare.classList.add("check");
    }

    if (this.gameState.whiteChecked) {
      const whiteKing = getPieceSquare(this.gameState, "wk");

      const whiteKingSquare = this.cellsElement.querySelector(
        `.cell-${whiteKing.x}-${whiteKing.y}`
      );
      whiteKingSquare.classList.add("check");
    }

    if (
      (this.gameState.turn === 1 && this.gameMode === "cpu") ||
      this.gameMode === "cvc"
    ) {
      this.doCpuMove();
    }
  };

  doCpuMove() {
    setTimeout(() => {
      const d = Date.now();
      const { count } = doCpuMove(
        this.gameState,
        this.gameState.turn === 0 ? "w" : "b",
        cpuDepth
      );

      this.calculationsText.textContent = `Evaluated ${toShort(
        count
      )} positions in ${Math.round((Date.now() - d) / 100) / 10}s`;
    }, 100);
  }

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
    const color = this.gameState.turn === 0 ? "White" : "Black";

    let text;
    if (this.gameMode === "1v1") {
      text = color + " to move";
    } else if (this.gameMode === "cpu") {
      text = color + (this.gameState.turn === 0 ? " to move" : " thinking...");
    } else {
      text = color + " thinking...";
    }

    this.statusText.textContent = text;

    this.moveText.textContent = `Move ${
      Math.floor(this.gameState.moves / 2) + 1
    }`;
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
}

export default new App();
