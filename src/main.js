import gameState from "./gameState";
import Bishop from "./pieces/Bishop";
import King from "./pieces/King";
import Knight from "./pieces/Knight";
import Pawn from "./pieces/Pawn";
import Queen from "./pieces/Queen";
import Rook from "./pieces/Rook";
import "./style.css";

const pieces = ["rook", "knight", "bishop", "queen", "king", "pawn"];
const pieceSvgs = {};
await Promise.all(
  pieces.map(async (piece) => {
    const svg = await fetch("./images/" + piece + ".svg");
    pieceSvgs[piece] = await svg.text();
  })
);

gameState.whitePieces = [
  ...new Array(8).fill(null).map((_, idx) => new Pawn({ x: idx, y: 6 })),
  new Rook({ x: 0, y: 7 }),
  new Rook({ x: 7, y: 7 }),
  new Knight({ x: 1, y: 7 }),
  new Knight({ x: 6, y: 7 }),
  new Bishop({ x: 2, y: 7 }),
  new Bishop({ x: 5, y: 7 }),
  new Queen({ x: 3, y: 7 }),
  new King({ x: 4, y: 7 }),
];

gameState.blackPieces = [
  ...new Array(8).fill(null).map((_, idx) => new Pawn({ x: idx, y: 1 })),
  new Rook({ x: 0, y: 0 }),
  new Rook({ x: 7, y: 0 }),
  new Knight({ x: 1, y: 0 }),
  new Knight({ x: 6, y: 0 }),
  new Bishop({ x: 2, y: 0 }),
  new Bishop({ x: 5, y: 0 }),
  new Queen({ x: 3, y: 0 }),
  new King({ x: 4, y: 0 }),
];

// const boardElement = document.querySelector("#board");
const clickLayer = document.querySelector("#click-layer");
const piecesElement = document.querySelector("#pieces");
const cellsElement = document.querySelector("#cells");

for (let y = 0; y < 8; y++) {
  const row = document.createElement("div");
  row.classList.add("row");
  cellsElement.appendChild(row);
  for (let x = 0; x < 8; x++) {
    const cell = document.createElement("div");
    cell.classList.add("cell", "cell-" + x + "-" + y);
    row.appendChild(cell);
  }
}

// 0 white, 1 black
let turn = 0;

let selectedTile = null;
let selectedPiece = null;

let validMoveTiles = [];

const onPieceClick = (piece) => {
  if (turn === 0) {
    if (selectedTile) {
      selectedTile.classList.remove("selected");
    }
    if (validMoveTiles.length) {
      validMoveTiles.forEach((tile) => tile.classList.remove("valid-move"));
    }
    validMoveTiles = [];
    selectedTile = cellsElement.querySelector(
      ".cell-" + piece.x + "-" + piece.y
    );
    selectedTile.classList.add("selected");

    selectedPiece = piece;

    // show valid moves
    const validMoves = piece.getValidMoves();

    validMoves.forEach((tile) => {
      const validMoveTile = cellsElement.querySelector(
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

clickLayer.addEventListener("click", onBoardClick);

gameState.whitePieces.forEach((piece) => {
  const pieceElement = document.createElement("div");
  pieceElement.classList.add("piece", "white");
  pieceElement.style.transform =
    "translate(" + piece.x * 50 + "px, " + piece.y * 50 + "px)";

  const parser = new DOMParser();
  const svgElement = parser.parseFromString(
    pieceSvgs[piece.type],
    "image/svg+xml"
  ).documentElement;
  pieceElement.appendChild(svgElement);

  piecesElement.appendChild(pieceElement);
  piece.element = pieceElement;
});

gameState.blackPieces.forEach((piece) => {
  const pieceElement = document.createElement("div");
  pieceElement.classList.add("piece", "black");
  pieceElement.style.transform =
    "translate(" + piece.x * 50 + "px, " + piece.y * 50 + "px)";

  const parser = new DOMParser();
  const svgElement = parser.parseFromString(
    pieceSvgs[piece.type],
    "image/svg+xml"
  ).documentElement;
  pieceElement.appendChild(svgElement);

  piecesElement.appendChild(pieceElement);
  piece.element = pieceElement;
});
