import { BOARD_SIZE } from "../consts";
import { getValidMoves, isInside, isOwnOccupied } from "../utils";

export default function getValidKingMoves(gameState, square, color) {
  const squares = [];

  // normal moves
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (i === 0 && j === 0) {
        continue;
      }
      squares.push({ x: square.x + i, y: square.y + j });
    }
  }

  // castles
  if (
    color === "w" &&
    gameState.canWhiteCastleQueenside &&
    !gameState.whiteChecked &&
    gameState.board[square.y][square.x - 1] === "" &&
    gameState.board[square.y][square.x - 2] === "" &&
    gameState.board[square.y][square.x - 3] === ""
  ) {
    // check if square being stepped over is safe
    let isSafe = true;
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        const piece = gameState.board[y][x];
        if (piece?.[0] === "b") {
          const squares = getValidMoves(
            gameState,
            {
              x,
              y,
            },
            gameState.board[y][x]
          );
          if (
            squares.some((sq) => sq.x === square.x - 1 && sq.y === square.y)
          ) {
            isSafe = false;
          }
        }
      }
    }

    if (isSafe) {
      squares.push({ x: square.x - 2, y: square.y });
    }
  } else if (
    color === "b" &&
    gameState.canBlackCastleQueenside &&
    !gameState.blackChecked &&
    gameState.board[square.y][square.x - 1] === "" &&
    gameState.board[square.y][square.x - 2] === "" &&
    gameState.board[square.y][square.x - 3] === ""
  ) {
    // check if square being stepped over is safe
    let isSafe = true;
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        const piece = gameState.board[y][x];
        if (piece?.[0] === "b") {
          const squares = getValidMoves(
            gameState,
            {
              x,
              y,
            },
            gameState.board[y][x]
          );
          if (
            squares.some((sq) => sq.x === square.x - 1 && sq.y === square.y)
          ) {
            isSafe = false;
          }
        }
      }
    }

    if (isSafe) {
      squares.push({ x: square.x - 2, y: square.y });
    }
  }
  if (
    color === "w" &&
    gameState.canWhiteCastleKingside &&
    !gameState.whiteChecked &&
    gameState.board[square.y][square.x + 1] === "" &&
    gameState.board[square.y][square.x + 2] === ""
  ) {
    // check if square being stepped over is safe
    let isSafe = true;
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        const piece = gameState.board[y][x];
        if (piece?.[0] === "b") {
          const squares = getValidMoves(
            gameState,
            {
              x,
              y,
            },
            gameState.board[y][x]
          );
          if (
            squares.some((sq) => sq.x === square.x + 1 && sq.y === square.y)
          ) {
            isSafe = false;
          }
        }
      }
    }

    if (isSafe) {
      squares.push({ x: square.x + 2, y: square.y });
    }
  } else if (
    color === "b" &&
    gameState.canBlackCastleKingside &&
    !gameState.blackChecked &&
    gameState.board[square.y][square.x + 1] === "" &&
    gameState.board[square.y][square.x + 2] === ""
  ) {
    // check if square being stepped over is safe
    let isSafe = true;
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        const piece = gameState.board[y][x];
        if (piece?.[0] === "b") {
          const squares = getValidMoves(
            gameState,
            {
              x,
              y,
            },
            gameState.board[y][x]
          );
          if (
            squares.some((sq) => sq.x === square.x + 1 && sq.y === square.y)
          ) {
            isSafe = false;
          }
        }
      }
    }

    if (isSafe) {
      squares.push({ x: square.x + 2, y: square.y });
    }
  }

  return squares
    .filter(isInside)
    .filter((square) => !isOwnOccupied(gameState, square, color));
}
