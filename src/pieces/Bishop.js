import { BOARD_SIZE } from "../consts";
import { getMovesByDeltas } from "../utils";

const MINUS_MINUS = new Array(BOARD_SIZE)
  .fill(null)
  .map((_, idx) => ({ x: -idx, y: -idx }));

const MINUS_PLUS = new Array(BOARD_SIZE)
  .fill(null)
  .map((_, idx) => ({ x: -idx, y: +idx }));

const PLUS_PLUS = new Array(BOARD_SIZE)
  .fill(null)
  .map((_, idx) => ({ x: +idx, y: +idx }));

const PLUS_MINUS = new Array(BOARD_SIZE)
  .fill(null)
  .map((_, idx) => ({ x: +idx, y: -idx }));

export default function getValidBishopMoves(gameState, square, color) {
  return [
    ...getMovesByDeltas(gameState, square, color, MINUS_MINUS),
    ...getMovesByDeltas(gameState, square, color, PLUS_MINUS),
    ...getMovesByDeltas(gameState, square, color, MINUS_PLUS),
    ...getMovesByDeltas(gameState, square, color, PLUS_PLUS),
  ];
}
