import { BOARD_SIZE, PIECE_VALUES } from './consts';
import {
  canBeCaptured,
  getIsOnTheEdge,
  getPieces,
  getValidPieceMovesNoCheck,
} from './utils';

const MAX_DEPTH = 3;

export function doCpuMove(gameState, color, depth = 0, runningCount = 0) {
  let count = 0;
  const evaluation = getEvaluation(gameState);

  const enemyColor = color === 'b' ? 'w' : 'b';

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
        gameState.board[y][x],
      );

      for (let destinationSquare of squares) {
        const willBeOnTheEdge = getIsOnTheEdge(
          destinationSquare.x,
          destinationSquare.y,
        );

        //   console.count("calcs");
        // let value = Math.random() * 0.1;
        let value = 0;

        const lastMove = {
          square,
          destinationSquare,
          piece: gameState.board[square.y][square.x],
          destinationPiece:
            gameState.board[destinationSquare.y][destinationSquare.x],
          whiteChecked: gameState.whiteChecked,
          blackChecked: gameState.blackChecked,
        };

        gameState.move(square, destinationSquare);
        gameState.endTurn();

        count++;

        if (color === 'w' ? gameState.blackChecked : gameState.whiteChecked) {
          value += 0.2;
        }

        // avoid king moves besides castling
        if (pieceType === 'k') {
          // prefer kingside
          if (destinationSquare.x - x === 2) {
            value += 0.6;
          } else if (x - destinationSquare.x === 2) {
            value += 0.5;
          } else {
            value -= 0.5;
          }
        } else if (pieceType === 'p') {
          // advance close to promotion
          const rank =
            color === 'b'
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
        else if (pieceType === 'n') {
          if (isOnTheEdge) {
            value += 0.5;
          }
          if (willBeOnTheEdge) {
            value -= 0.2;
          }
        }
        // centralize bishops
        else if (pieceType === 'b') {
          if (isOnTheEdge) {
            value += 0.5;
          }
          if (willBeOnTheEdge) {
            value -= 0.2;
          }
        }
        // centralize queens
        else if (pieceType === 'q') {
          if (willBeOnTheEdge) {
            value -= 0.2;
          }
        }
        // centralize rooks
        else if (pieceType === 'r') {
          if (willBeOnTheEdge) {
            value -= 0.2;
          }
        }

        const evaluationDelta = getEvaluation(gameState) - evaluation;
        value += color === 'b' ? -evaluationDelta : evaluationDelta;

        const move = {
          fromSquare: square,
          toSquare: destinationSquare,
          value,
          gameState,
          lastMove,
        };
        moves.push(move);
        // console.log(getBoardString(gameState.board))

        // reset the board
        gameState.board[move.lastMove.destinationSquare.y][
          move.lastMove.destinationSquare.x
        ] = move.lastMove.destinationPiece || '';
        gameState.board[move.lastMove.square.y][move.lastMove.square.x] =
          move.lastMove.piece;

        gameState.turn = 1 - gameState.turn;
        gameState.moves--;
        gameState.whiteChecked = move.lastMove.whiteChecked;
        gameState.blackChecked = move.lastMove.blackChecked;

        // console.log(getBoardString(gameState.board))
        // console.log(move.lastMove)

        // if (depth === 1) {
        //   throw 1
        // }
      }
    }
  });

  moves.sort((a, b) => b.value - a.value);

  // moves = moves.slice(0, 2);
  // console.log(moves.map(d => d.lastMove))

  if (depth < MAX_DEPTH) {
    moves.forEach((move) => {
      let value = move.value;

      let sub;

      gameState.move(move.fromSquare, move.toSquare);
      gameState.endTurn();

      // console.log(depth)
      // console.log(getBoardString(gameState.board))

      const calculations = doCpuMove(
        move.gameState,
        enemyColor,
        depth + 1,
        count + runningCount,
      );

      // reset the board
      gameState.board[move.lastMove.destinationSquare.y][
        move.lastMove.destinationSquare.x
      ] = move.lastMove.destinationPiece || '';
      gameState.board[move.lastMove.square.y][move.lastMove.square.x] =
        move.lastMove.piece;

      gameState.turn = 1 - gameState.turn;
      gameState.moves--;
      gameState.whiteChecked = move.lastMove.whiteChecked;
      gameState.blackChecked = move.lastMove.blackChecked;

      count += calculations.count;

      if (calculations.bestMove) {
        sub = calculations.bestMove;
        value -= calculations.bestMove.value;
        // value -= calculations.bestMove.value / 1.1;
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
          occupyingPiece[0],
          occupyingPiece[1] !== 'k',
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

  return { bestMove, count };
}

function getEvaluation(gameState) {
  return gameState.board.flat().reduce((prev, next) => {
    if (!next) {
      return prev;
    }
    return prev + PIECE_VALUES[next[1]] * (next[0] === 'w' ? 1 : -1);
  }, 0);
}
