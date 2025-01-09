import { BOARD_SIZE } from "../consts";
import { getMovesByDeltas } from "../utils";

export default function getValidBishopMoves(gameState, square, color) {
  return [
    ...getMovesByDeltas(
      gameState,
      square,
      color,
      new Array(BOARD_SIZE).fill(null).map((_, idx) => ({ x: -idx, y: -idx }))
    ),
    ...getMovesByDeltas(
      gameState,
      square,
      color,
      new Array(BOARD_SIZE).fill(null).map((_, idx) => ({ x: +idx, y: -idx }))
    ),
    ...getMovesByDeltas(
      gameState,
      square,
      color,
      new Array(BOARD_SIZE).fill(null).map((_, idx) => ({ x: -idx, y: +idx }))
    ),
    ...getMovesByDeltas(
      gameState,
      square,
      color,
      new Array(BOARD_SIZE).fill(null).map((_, idx) => ({ x: +idx, y: +idx }))
    ),
  ];
}
