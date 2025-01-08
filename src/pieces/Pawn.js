import { isInside, isOccupied } from "../utils";

export default function getValidPawnMoves(gameState, square, color) {
  const moves = [];

  const possibleMoves =
    color === "w"
      ? [...(square.y !== 0 ? [{ x: square.x, y: square.y - 1 }] : [])]
      : [...(square.y !== 7 ? [{ x: square.x, y: square.y + 1 }] : [])];

  // double move
  if (possibleMoves.length && !isOccupied(gameState, possibleMoves[0])) {
    possibleMoves.push(
      ...(color === "w"
        ? [...(square.y === 6 ? [{ x: square.x, y: square.y - 2 }] : [])]
        : [...(square.y === 1 ? [{ x: square.x, y: square.y + 2 }] : [])])
    );
  }

  const possibleCaptures =
    color === "w"
      ? [
          { x: square.x - 1, y: square.y - 1 },
          { x: square.x + 1, y: square.y - 1 },
        ]
      : [
          { x: square.x - 1, y: square.y + 1 },
          { x: square.x + 1, y: square.y + 1 },
        ];

  moves.push(
    ...possibleMoves
      .filter(isInside)
      .filter((square) => !isOccupied(gameState, square))
  );

  moves.push(
    ...possibleCaptures.filter(isInside).filter((square) => {
      const occupyingPiece = gameState.board[square.y][square.x];

      if (occupyingPiece?.[0] === undefined || occupyingPiece[0] === color) {
        return false;
      }

      return true;
    })
  );

  return moves;
}
