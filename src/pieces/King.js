import { isInside, isOwnOccupied } from "../utils";

export default function getValidKingMoves(gameState, square, color) {
  const squares = [];

  // normal moves
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (i === 0 && j === 0) {
        continue;
      }
      squares.push({ x: square.x + i, y: square.y + j });
    }
  }

  // castles
  if (
    color === "w"
      ? gameState.canWhiteCastleQueenside
      : gameState.canBlackCastleQueenside
  ) {
    squares.push({ x: square.x - 2, y: square.y });
  }
  if (
    color === "w"
      ? gameState.canWhiteCastleKingside
      : gameState.canBlackCastleKingside
  ) {
    squares.push({ x: square.x + 2, y: square.y });
  }

  return squares
    .filter(isInside)
    .filter((square) => !isOwnOccupied(gameState, square, color));
}
