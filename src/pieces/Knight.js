import { isInside, isOwnOccupied } from "../utils";

export default function getValidKnightMoves(gameState, square, color) {
  const squares = [
    { x: square.x + 1, y: square.y + 2 },
    { x: square.x + 2, y: square.y + 1 },
    { x: square.x - 1, y: square.y + 2 },
    { x: square.x - 2, y: square.y + 1 },
    { x: square.x + 1, y: square.y - 2 },
    { x: square.x + 2, y: square.y - 1 },
    { x: square.x - 1, y: square.y - 2 },
    { x: square.x - 2, y: square.y - 1 },
  ];

  return squares
    .filter((square) => isInside(square))
    .filter((square) => !isOwnOccupied(gameState, square, color));
}
