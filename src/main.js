import { BOARD_SIZE } from "./consts";
import app from "./app";
import "./style.css";
import { getValidMovesNoCheck } from "./utils";

for (let y = 0; y < BOARD_SIZE; y++) {
  const row = document.createElement("div");
  row.classList.add("row");
  app.cellsElement.appendChild(row);
  for (let x = 0; x < BOARD_SIZE; x++) {
    const cell = document.createElement("div");
    cell.classList.add("cell", `cell-${x}-${y}`);
    row.appendChild(cell);
  }
}

let selectedSquare = null;
let selectedSquareElement = null;
let selectedPiece = null;

let validMoveTiles = [];

const onPieceClick = (square, piece) => {
  if (selectedSquareElement) {
    selectedSquareElement.classList.remove("selected");
  }
  if (validMoveTiles.length) {
    validMoveTiles.forEach((tile) => tile.classList.remove("valid-move"));
  }
  validMoveTiles = [];
  selectedSquareElement = app.cellsElement.querySelector(
    `.cell-${square.x}-${square.y}`
  );
  selectedSquareElement.classList.add("selected");

  selectedSquare = square;
  selectedPiece = piece;

  // show valid moves
  const validMoves = getValidMovesNoCheck(app.gameState, square, piece);

  validMoves.forEach((tile) => {
    const validMoveTile = app.cellsElement.querySelector(
      `.cell-${tile.x}-${tile.y}`
    );
    validMoveTile.classList.add("valid-move");
    validMoveTiles.push(validMoveTile);
  });
};

const onBoardClick = (e) => {
  const clickedSquare = {
    x: Math.floor(e.offsetX / 50),
    y: Math.floor(e.offsetY / 50),
  };

  const clickedPiece = app.gameState.board[clickedSquare.y][clickedSquare.x];

  if (clickedPiece?.[0] === (app.gameState.turn === 0 ? "w" : "b")) {
    onPieceClick(clickedSquare, clickedPiece);
    return;
  }

  if (!selectedPiece) {
    return;
  }

  const validMoves = getValidMovesNoCheck(
    app.gameState,
    selectedSquare,
    selectedPiece
  );

  if (
    !validMoves.some(
      (move) => move.x === clickedSquare.x && move.y === clickedSquare.y
    )
  ) {
    return;
  }

  if (validMoveTiles.length) {
    validMoveTiles.forEach((tile) => tile.classList.remove("valid-move"));
  }

  app.gameState.move(selectedSquare, clickedSquare);

  selectedPiece = null;
  selectedSquare = null;
  selectedSquareElement.classList.remove("selected");
  selectedSquareElement = null;

  app.gameState.endTurn();
};

app.clickLayer.addEventListener("click", onBoardClick);
