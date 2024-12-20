import { BOARD_SIZE } from "./consts";

export const isInside = (square) => {
  return (
    square.x < BOARD_SIZE &&
    square.x >= 0 &&
    square.y < BOARD_SIZE &&
    square.y >= 0
  );
};
