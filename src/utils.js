import { BOARD_SIZE } from "./consts";
import gameState, { Game } from "./gameState";

export const isInside = (square) => {
  return (
    square.x < BOARD_SIZE &&
    square.x >= 0 &&
    square.y < BOARD_SIZE &&
    square.y >= 0
  );
};

export const resultsInCheck = (piece, square) => {
  let whitePieces = [...piece.gameState.whitePieces];
  let blackPieces = [...piece.gameState.blackPieces];

  if (piece.color === "white") {
    const pieceIndex = whitePieces.findIndex(
      (p) => p.x === piece.x && p.y === piece.y
    );
    whitePieces = whitePieces.map((p, idx) => {
      if (idx === pieceIndex) {
        return p.clone({ ...square, color: p.color });
      }
      return p.clone({ x: p.x, y: p.y, color: p.color });
    });
  } else {
    const pieceIndex = blackPieces.findIndex(
      (p) => p.x === piece.x && p.y === piece.y
    );
    blackPieces = blackPieces.map((p, idx) => {
      if (idx === pieceIndex) {
        return p.clone({ ...square, color: p.color });
      }
      return p.clone({ x: p.x, y: p.y, color: p.color });
    });
  }

  const newGameState = new Game(whitePieces, blackPieces, 1 - gameState.turn);

  newGameState.updateChecked();

  if (piece.color === "black" && newGameState.blackChecked) {
    return false;
  }

  if (piece.color === "white" && newGameState.whiteChecked) {
    return false;
  }

  return true;
};
