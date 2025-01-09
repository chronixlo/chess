import { BOARD_SIZE } from "../consts";
import { getMovesByDeltas } from "../utils";

export default function getValidRookMoves(gameState, square, color) {
  return [
    ...getMovesByDeltas(
      gameState,
      square,
      color,
      new Array(BOARD_SIZE).fill(null).map((_, idx) => ({ x: -idx }))
    ),
    ...getMovesByDeltas(
      gameState,
      square,
      color,
      new Array(BOARD_SIZE).fill(null).map((_, idx) => ({ x: +idx }))
    ),
    ...getMovesByDeltas(
      gameState,
      square,
      color,
      new Array(BOARD_SIZE).fill(null).map((_, idx) => ({ y: -idx }))
    ),
    ...getMovesByDeltas(
      gameState,
      square,
      color,
      new Array(BOARD_SIZE).fill(null).map((_, idx) => ({ y: +idx }))
    ),
  ];
}
