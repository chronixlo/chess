import { BOARD_SIZE } from "../consts";
import { isInside, isOccupied, isOwnOccupied } from "../utils";

export default function getValidQueenMoves(gameState, square, color) {
  const squares = [];

  // -x
  for (let i = 1; i < BOARD_SIZE; i++) {
    const newSquare = { x: square.x - i, y: square.y };

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

  // -y
  for (let i = 1; i < BOARD_SIZE; i++) {
    const newSquare = { x: square.x, y: square.y - i };

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

  // +x
  for (let i = 1; i < BOARD_SIZE; i++) {
    const newSquare = { x: square.x + i, y: square.y };

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

  // +y
  for (let i = 1; i < BOARD_SIZE; i++) {
    const newSquare = { x: square.x, y: square.y + i };

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

  // -x
  for (let i = 1; i < BOARD_SIZE; i++) {
    const newSquare = { x: square.x - i, y: square.y - i };

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

  // -y
  for (let i = 1; i < BOARD_SIZE; i++) {
    const newSquare = { x: square.x + i, y: square.y - i };

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

  // +x
  for (let i = 1; i < BOARD_SIZE; i++) {
    const newSquare = { x: square.x + i, y: square.y + i };

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

  // +y
  for (let i = 1; i < BOARD_SIZE; i++) {
    const newSquare = { x: square.x - i, y: square.y + i };

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
