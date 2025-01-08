import { BOARD_SIZE, PIECE_VALUES } from "./consts";
import gameState from "./gameState";
import "./style.css";
import { getValidMovesNoCheck } from "./utils";

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
  selectedSquareElement = gameState.cellsElement.querySelector(
    `.cell-${square.x}-${square.y}`
  );
  selectedSquareElement.classList.add("selected");

  selectedSquare = square;
  selectedPiece = piece;

  // show valid moves
  const validMoves = getValidMovesNoCheck(gameState, square, piece);

  validMoves.forEach((tile) => {
    const validMoveTile = gameState.cellsElement.querySelector(
      ".cell-" + tile.x + "-" + tile.y
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

  const clickedPiece = gameState.board[clickedSquare.y][clickedSquare.x];

  if (clickedPiece?.[0] === (gameState.turn === 0 ? "w" : "b")) {
    onPieceClick(clickedSquare, clickedPiece);
    return;
  }

  if (!selectedPiece) {
    return;
  }

  const validMoves = getValidMovesNoCheck(
    gameState,
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

  gameState.move(selectedSquare, clickedSquare);

  selectedPiece = null;
  selectedSquare = null;
  selectedSquareElement.classList.remove("selected");
  selectedSquareElement = null;

  gameState.endTurn();

  if (gameState.gameMode === "cpu") {
    doCpuMove();
  }
};

function doCpuMove() {
  const ownPieces = gameState.blackPieces;
  const enemyPieces = gameState.whitePieces;

  let bestCapture = null;

  // check for captures
  for (let piece of ownPieces) {
    const squares = piece.getValidMovesNoCheck();
    for (let square of squares) {
      const occupyingPiece = enemyPieces.find(
        (p) => p.x === square.x && p.y === square.y
      );

      if (occupyingPiece) {
        const value =
          PIECE_VALUES[occupyingPiece.type] - PIECE_VALUES[piece.type];

        if (bestCapture == null || value > bestCapture.value) {
          bestCapture = { piece, square, value };
        }
      }
    }
  }

  if (bestCapture) {
    bestCapture.piece.move(bestCapture.square);
  } else {
    // random move
    for (let piece of ownPieces) {
      const squares = piece.getValidMovesNoCheck();

      if (squares.length) {
        piece.move(squares[0]);
        break;
      }
    }
  }

  gameState.endTurn();
}

gameState.clickLayer.addEventListener("click", onBoardClick);
