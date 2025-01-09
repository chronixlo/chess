import { BOARD_SIZE, PIECE_VALUES } from "./consts";
import { Game } from "./gameState";
import { getValidMovesNoCheck } from "./utils";

export function doCpuMove(gameState, color, depth) {
  const evaluation = getEvaluation(gameState);

  const enemyColor = color === "b" ? "w" : "b";

  let bestMove = null;

  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const piece = gameState.board[y][x];

      if (piece?.[0] === color) {
        const pieceType = piece[1];
        const isOnTheEdge =
          x === 0 || x === BOARD_SIZE - 1 || y === 0 || y === BOARD_SIZE - 1;

        const squares = getValidMovesNoCheck(
          gameState,
          {
            x,
            y,
          },
          gameState.board[y][x]
        );

        for (let square of squares) {
          //   console.count("calcs");
          let value = Math.random() * 0.2 - 0.1;

          const newGameState = new Game({
            ...gameState,
            board: gameState.getBoardString(),
            sim: true,
          });
          newGameState.move({ x, y }, square);
          newGameState.endTurn();

          // avoid kings moves besides castling
          if (pieceType === "k") {
            if (Math.abs(x - square.x) === 2) {
              value += 0.5;
            } else {
              value -= 0.5;
            }
          }
          // try to play central pawns
          else if (pieceType === "p") {
            if (x === 3 || x === 4) {
              if (Math.abs(y - square.y) === 2) {
                value += 0.7;
              } else {
                value += 0.4;
              }
            }
          }
          // centralize knights
          else if (pieceType === "n") {
            if (isOnTheEdge) {
              value += 0.5;
            }
          }
          // centralize bishops
          else if (pieceType === "b") {
            if (isOnTheEdge) {
              value += 0.5;
            }
          }

          if (depth > 0) {
            doCpuMove(newGameState, enemyColor, depth - 1);
          }

          const evaluationDelta = getEvaluation(newGameState) - evaluation;
          value += color === "b" ? -evaluationDelta : evaluationDelta;

          //   if (depth === 1 && value !== 0 && color === "b")
          //     console.log({ x, y }, square, value);

          if (bestMove == null || value > bestMove?.value) {
            bestMove = { fromSquare: { x, y }, toSquare: square, value };
          }
        }
      }
    }
  }

  if (bestMove) {
    gameState.move(bestMove.fromSquare, bestMove.toSquare);

    gameState.endTurn();
  }
}

function getEvaluation(gameState) {
  return gameState.board.flat().reduce((prev, next) => {
    if (!next) {
      return prev;
    }
    return prev + PIECE_VALUES[next[1]] * (next[0] === "w" ? 1 : -1);
  }, 0);
}
