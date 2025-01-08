import { BOARD_SIZE } from "./consts";
import gameState, { Game } from "./gameState";
import getValidBishopMoves from "./pieces/bishop";
import getValidKingMoves from "./pieces/king";
import getValidKnightMoves from "./pieces/knight";
import getValidPawnMoves from "./pieces/pawn";
import getValidQueenMoves from "./pieces/queen";
import getValidRookMoves from "./pieces/rook";

export const isInside = (square) => {
  return (
    square.x < BOARD_SIZE &&
    square.x >= 0 &&
    square.y < BOARD_SIZE &&
    square.y >= 0
  );
};

export const isOccupied = (gameState, square) => {
  const isOccupied = gameState.board[square.y][square.x] !== "";

  if (isOccupied) {
    return true;
  }

  return false;
};

export const isOwnOccupied = (gameState, square, color) => {
  const occupyingPiece = gameState.board[square.y][square.x];

  if (occupyingPiece?.[0] === color) {
    return true;
  }

  return false;
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

export function getValidMovesNoCheck(gameState, square, piece) {
  const validMoves = getValidMoves(gameState, square, piece);

  return validMoves.filter((newSquare) => {
    const newGameState = new Game({
      board: gameState.getBoardString(),
      sim: true,
      turn: gameState.turn,
    });
    newGameState.move(square, newSquare);
    newGameState.endTurn();

    return piece[0] === "w"
      ? !newGameState.whiteChecked
      : !newGameState.blackChecked;
  });
}

export function getValidMoves(gameState, square, piece) {
  const color = piece[0];
  const pieceType = piece[1];

  if (pieceType === "p") {
    return getValidPawnMoves(gameState, square, color);
  }

  if (pieceType === "n") {
    return getValidKnightMoves(gameState, square, color);
  }

  if (pieceType === "b") {
    return getValidBishopMoves(gameState, square, color);
  }

  if (pieceType === "r") {
    return getValidRookMoves(gameState, square, color);
  }

  if (pieceType === "k") {
    return getValidKingMoves(gameState, square, color);
  }

  if (pieceType === "q") {
    return getValidQueenMoves(gameState, square, color);
  }

  return [];
}
