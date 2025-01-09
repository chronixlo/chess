import { BOARD_SIZE, PIECE_VALUES } from "./consts";
import { Game } from "./gameState";
import { getValidMovesNoCheck } from "./utils";

export function doCpuMove(gameState, color, skipLookahead) {
  let bestCapture = null;

  const evaluation = getEvaluation(gameState);

  const enemyColor = color === "b" ? "w" : "b";

  const enPassant =
    color === "b" ? gameState.whiteEnPassant : gameState.blackEnPassant;
  const enPassantOffset = color === "b" ? -1 : 1;

  // check for captures
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const piece = gameState.board[y][x];
      if (piece?.[0] === color) {
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

          // set piece being captured to the piece in the "wrong" en passant square
          if (enPassant?.x === square.x && enPassant?.y === square.y) {
            occupyingPiece =
              gameState.board[enPassant.y + enPassantOffset][enPassant.x];
          }

          if (occupyingPiece?.[0] === enemyColor) {
            let value;

            if (skipLookahead) {
              value = PIECE_VALUES[occupyingPiece[1]];
            } else {
              const newGameState = new Game({
                ...gameState,
                board: gameState.getBoardString(),
                sim: true,
              });
              newGameState.move({ x, y }, square);
              newGameState.endTurn();

              doCpuMove(newGameState, enemyColor, true);

              const evaluationDelta = getEvaluation(newGameState) - evaluation;
              value = color === "b" ? -evaluationDelta : evaluationDelta;
            }

            if (value > (bestCapture?.value || 0)) {
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
        if (piece?.[0] === color) {
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

function getEvaluation(gameState) {
  return gameState.board.flat().reduce((prev, next) => {
    if (!next) {
      return prev;
    }
    return prev + PIECE_VALUES[next[1]] * (next[0] === "w" ? 1 : -1);
  }, 0);
}
