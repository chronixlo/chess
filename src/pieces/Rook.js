import { BOARD_SIZE } from "../consts";
import { getMovesByDeltas } from "../utils";

const X_MINUS = new Array(BOARD_SIZE).fill(null).map((_, idx) => ({ x: -idx }));
const X_PLUS = new Array(BOARD_SIZE).fill(null).map((_, idx) => ({ x: +idx }));
const Y_MINUS = new Array(BOARD_SIZE).fill(null).map((_, idx) => ({ y: -idx }));
const Y_PLUS = new Array(BOARD_SIZE).fill(null).map((_, idx) => ({ y: +idx }));

export default function getValidRookMoves(gameState, square, color) {
  return [
    ...getMovesByDeltas(gameState, square, color, X_MINUS),
    ...getMovesByDeltas(gameState, square, color, X_PLUS),
    ...getMovesByDeltas(gameState, square, color, Y_MINUS),
    ...getMovesByDeltas(gameState, square, color, Y_PLUS),
  ];
}
