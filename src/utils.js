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

export function getValidPieceMovesNoCheck(gameState, square, piece) {
  const validMoves = getValidPieceMoves(gameState, square, piece);

  return validMoves.filter((newSquare) => {
    const newGameState = new Game({
      ...gameState,
      onEndTurn: null,
      onMove: null,
    });
    // do move and update checked without ending turn
    newGameState.move(square, newSquare);
    newGameState.updateChecked();

    return piece[0] === "w"
      ? !newGameState.whiteChecked
      : !newGameState.blackChecked;
  });
}

export function getValidPieceMoves(gameState, square, piece, noCastles) {
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

/** for bishop/rook(/queen) only */
export function getMovesByDeltas(gameState, square, color, deltas) {
  const squares = [];

  for (let delta of deltas) {
    if (!delta.x && !delta.y) {
      continue;
    }

    const newSquare = {
      x: square.x + (delta.x || 0),
      y: square.y + (delta.y || 0),
    };

    if (!isInside(newSquare)) {
      break;
    }

    if (isOwnOccupied(gameState, newSquare, color)) {
      break;
    }

    squares.push(newSquare);

    if (isOccupied(gameState, newSquare, color)) {
      break;
    }
  }
  return squares;
}

export function getBoardString(board) {
  return board.map((rank) => rank.join(",")).join("\n");
}

export function toShort(value) {
  if (value > 10000) {
    return Math.round(value / 100) / 10 + "k";
  }
  return value;
}

export function getPieces(gameState) {
  const color = gameState.turn === 0 ? "w" : "b";
  const pieces = [];
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const piece = gameState.board[y][x];
      if (piece?.[0] === color) {
        pieces.push({ x, y });
      }
    }
  }
  return pieces;
}

export function getPieceSquare(gameState, piece) {
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      if (gameState.board[y][x] === piece) {
        return {
          x,
          y,
        };
      }
    }
  }
}
