import { BOARD_SIZE, PIECE_VALUES } from "./consts";
import { getValidMovesNoCheck } from "./utils";

export function doCpuMove(gameState) {
  let bestCapture = null;

  // check for captures
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const piece = gameState.board[y][x];
      if (piece?.[0] === "b") {
        const squares = getValidMovesNoCheck(
          gameState,
          {
            x,
            y,
          },
          gameState.board[y][x]
        );

        for (let square of squares) {
          let occupyingPiece = gameState.board[square.y][square.x];

          if (
            gameState.whiteEnPassant?.x === square.x &&
            gameState.whiteEnPassant?.y === square.y
          ) {
            occupyingPiece =
              gameState.board[gameState.whiteEnPassant.y - 1][
                gameState.whiteEnPassant.x
              ];
          }

          if (occupyingPiece?.[0] === "w") {
            const value =
              PIECE_VALUES[occupyingPiece[1]] - PIECE_VALUES[piece[1]];

            if (bestCapture == null || value > bestCapture.value) {
              bestCapture = { fromSquare: { x, y }, toSquare: square, value };
            }
          }
        }
      }
    }
  }

  if (bestCapture) {
    gameState.move(bestCapture.fromSquare, bestCapture.toSquare);
  } else {
    // random move

    const pieceCoordinates = [];

    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        const piece = gameState.board[y][x];
        if (piece?.[0] === "b") {
          pieceCoordinates.push({ x, y });
        }
      }
    }

    pieceCoordinates.sort(() => Math.random() - 0.5);

    for (let square of pieceCoordinates) {
      const squares = getValidMovesNoCheck(
        gameState,
        square,
        gameState.board[square.y][square.x]
      );

      if (squares.length) {
        const toSquare = squares[Math.floor(Math.random() * squares.length)];
        gameState.move(square, toSquare);
        break;
      }
    }
  }

  gameState.endTurn();
}
