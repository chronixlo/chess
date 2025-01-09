import { BOARD_SIZE } from "./consts";
import Game from "./Game";
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

export function getValidMovesNoCheck(gameState, square, piece) {
  const validMoves = getValidMoves(gameState, square, piece);

  return validMoves.filter((newSquare) => {
    const newGameState = new Game({
      ...gameState,
      board: gameState.getBoardString(),
      sim: true,
      onEndTurn: null,
      onMove: null,
    });
    newGameState.move(square, newSquare);
    newGameState.endTurn();

    return piece[0] === "w"
      ? !newGameState.whiteChecked
      : !newGameState.blackChecked;
  });
}

export function getValidMoves(gameState, square, piece, noCastles) {
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
    return getValidKingMoves(gameState, square, color, noCastles);
  }

  if (pieceType === "q") {
    return getValidQueenMoves(gameState, square, color);
  }

  return [];
}

export function getIsOnTheEdge(x, y) {
  return x === 0 || x === BOARD_SIZE - 1 || y === 0 || y === BOARD_SIZE - 1;
}
