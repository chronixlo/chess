import { BOARD_SIZE, PIECE_VALUES } from "./consts";
import Game from "./Game";
import {
  canBeCaptured,
  getIsOnTheEdge,
  getPieces,
  getValidPieceMovesNoCheck,
} from "./utils";

const MAX_DEPTH = 3;
const MOVES_PER_DEPTH = {
  0: 100,
  1: 30,
  2: 10,
  3: 7,
  4: 4,
};

export function doCpuMove(gameState, color, depth = 0, runningCount = 0) {
  let count = 0;
  const evaluation = getEvaluation(gameState);

  const enemyColor = color === "b" ? "w" : "b";

  let bestMove = null;

  const pieces = getPieces(gameState);
  let moves = [];

  pieces.forEach((square) => {
    const { x, y } = square;
    const piece = gameState.board[y][x];

    if (piece?.[0] === color) {
      const pieceType = piece[1];
      const isOnTheEdge = getIsOnTheEdge(x, y);

      const squares = getValidPieceMovesNoCheck(
        gameState,
        square,
        gameState.board[y][x]
      );

      for (let destinationSquare of squares) {
        const willBeOnTheEdge = getIsOnTheEdge(
          destinationSquare.x,
          destinationSquare.y
        );

        //   console.count("calcs");
        let value = Math.random() * 0.1;

        const newGameState = new Game({
          ...gameState,
          onEndTurn: null,
          onMove: null,
        });
        newGameState.move(square, destinationSquare);
        newGameState.endTurn();

        count++;

        if (
          color === "w" ? newGameState.blackChecked : newGameState.whiteChecked
        ) {
          value += 0.2;
        }

        // avoid king moves besides castling
        if (pieceType === "k") {
          // prefer kingside
          if (destinationSquare.x - x === 2) {
            value += 0.6;
          } else if (x - destinationSquare.x === 2) {
            value += 0.5;
          } else {
            value -= 0.5;
          }
        } else if (pieceType === "p") {
          // advance close to promotion
          const rank =
            color === "b"
              ? destinationSquare.y
              : BOARD_SIZE - 1 - destinationSquare.y;

          if (rank > 4) {
            value += rank * 0.1;
          }

          // try to advance central pawns
          if ((x === 3 || x === 4) && destinationSquare.x === x) {
            if (Math.abs(y - destinationSquare.y) === 2) {
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
          if (willBeOnTheEdge) {
            value -= 0.2;
          }
        }
        // centralize bishops
        else if (pieceType === "b") {
          if (isOnTheEdge) {
            value += 0.5;
          }
          if (willBeOnTheEdge) {
            value -= 0.2;
          }
        }
        // centralize queens
        else if (pieceType === "q") {
          if (willBeOnTheEdge) {
            value -= 0.2;
          }
        }
        // centralize rooks
        else if (pieceType === "r") {
          if (willBeOnTheEdge) {
            value -= 0.2;
          }
        }

        const evaluationDelta = getEvaluation(newGameState) - evaluation;
        value += color === "b" ? -evaluationDelta : evaluationDelta;

        const move = {
          fromSquare: square,
          toSquare: destinationSquare,
          value,
          gameState: newGameState,
        };
        moves.push(move);
      }
    }
  });

  moves.sort((a, b) => b.value - a.value);

  moves = moves.slice(0, MOVES_PER_DEPTH[depth] || 2);

  if (depth < MAX_DEPTH && runningCount < 1e6) {
    moves.forEach((move) => {
      let value = move.value;

      let sub;
      const calculations = doCpuMove(
        move.gameState,
        enemyColor,
        depth + 1,
        count + runningCount
      );
      count += calculations.count;

      if (calculations.bestMove) {
        sub = calculations.bestMove;
        value -= calculations.bestMove.value / 1.1;
      } else {
        // mate, both false is stalemate
        if (move.gameState.blackChecked || move.gameState.whiteChecked) {
          value += 1000;
        }
      }

      if (bestMove == null || value > bestMove?.value) {
        bestMove = {
          fromSquare: move.fromSquare,
          toSquare: move.toSquare,
          value,
          preContinuationValue: move.value,
          sub,
        };
      }
    });
  } else {
    bestMove = moves.reduce((prev, next) => {
      if (!prev || next.value > prev.value) {
        const occupyingPiece =
          next.gameState.board[next.toSquare.y][next.toSquare.x];
        const canBeTaken = canBeCaptured(
          next.gameState,
          next.toSquare,
          occupyingPiece[0]
        );
        const newValue =
          next.value - (canBeTaken ? PIECE_VALUES[occupyingPiece[1]] : 0);

        if (!prev || newValue > prev.value) {
          return {
            ...next,
            value: newValue,
          };
        }
      }
      return prev;
    }, null);
  }

  if (bestMove) {
    gameState.move(bestMove.fromSquare, bestMove.toSquare);
    gameState.endTurn();
  }

  return { bestMove, count };
}

function getEvaluation(gameState) {
  return gameState.board.flat().reduce((prev, next) => {
    if (!next) {
      return prev;
    }
    return prev + PIECE_VALUES[next[1]] * (next[0] === "w" ? 1 : -1);
  }, 0);
}
