import { BOARD_SIZE, PIECE_VALUES } from "./consts";
import gameState from "./gameState";
import "./style.css";

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
};

const onBoardClick = (e) => {
  const clickedSquare = {
    x: Math.floor(e.offsetX / 50),
    y: Math.floor(e.offsetY / 50),
  };

  const ownPieces =
    gameState.turn === 0 ? gameState.whitePieces : gameState.blackPieces;

  const clickedPiece = ownPieces.find(
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

  selectedPiece = null;
  selectedTile.classList.remove("selected");
  selectedTile = null;

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
    const squares = piece.getValidMoves();
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
      const squares = piece.getValidMoves();

      if (squares.length) {
        piece.move(squares[0]);
        console.log(piece, squares[0]);
        break;
      }
    }
  }

  gameState.endTurn();
}

gameState.clickLayer.addEventListener("click", onBoardClick);
