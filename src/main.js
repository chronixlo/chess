import { BOARD_SIZE } from "./consts";
import gameState from "./gameState";
import Bishop from "./pieces/Bishop";
import King from "./pieces/King";
import Knight from "./pieces/Knight";
import Pawn from "./pieces/Pawn";
import Queen from "./pieces/Queen";
import Rook from "./pieces/Rook";
import "./style.css";

gameState.whitePieces = [
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

gameState.blackPieces = [
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

for (let y = 0; y < BOARD_SIZE; y++) {
  const row = document.createElement("div");
  row.classList.add("row");
  gameState.cellsElement.appendChild(row);
  for (let x = 0; x < BOARD_SIZE; x++) {
    const cell = document.createElement("div");
    cell.classList.add("cell", "cell-" + x + "-" + y);
    row.appendChild(cell);
  }
}

let selectedTile = null;
let selectedPiece = null;

let validMoveTiles = [];

const onPieceClick = (piece) => {
  if (gameState.turn === 0) {
    if (selectedTile) {
      selectedTile.classList.remove("selected");
    }
    if (validMoveTiles.length) {
      validMoveTiles.forEach((tile) => tile.classList.remove("valid-move"));
    }
    validMoveTiles = [];
    selectedTile = gameState.cellsElement.querySelector(
      `.cell-${piece.x}-${piece.y}`
    );
    selectedTile.classList.add("selected");

    selectedPiece = piece;

    // show valid moves
    const validMoves = piece.getValidMoves();

    validMoves.forEach((tile) => {
      const validMoveTile = gameState.cellsElement.querySelector(
        ".cell-" + tile.x + "-" + tile.y
      );
      validMoveTile.classList.add("valid-move");
      validMoveTiles.push(validMoveTile);
    });
  }
};

const onBoardClick = (e) => {
  const clickedSquare = {
    x: Math.floor(e.offsetX / 50),
    y: Math.floor(e.offsetY / 50),
  };

  const clickedPiece = gameState.whitePieces.find(
    (piece) => piece.x === clickedSquare.x && piece.y === clickedSquare.y
  );

  if (clickedPiece) {
    onPieceClick(clickedPiece);
    return;
  }

  if (!selectedPiece) {
    return;
  }

  const validMoves = selectedPiece.getValidMoves();

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

  selectedPiece.move(clickedSquare);

  const capturedPieceIndex = gameState.blackPieces.findIndex(
    (piece) => piece.x === clickedSquare.x && piece.y === clickedSquare.y
  );

  if (capturedPieceIndex !== -1) {
    gameState.blackPieces[capturedPieceIndex].element.parentNode.removeChild(
      gameState.blackPieces[capturedPieceIndex].element
    );
    gameState.blackPieces.splice(capturedPieceIndex, 1);
  }

  selectedPiece = null;
  selectedTile.classList.remove("selected");
  selectedTile = null;
};

gameState.clickLayer.addEventListener("click", onBoardClick);
