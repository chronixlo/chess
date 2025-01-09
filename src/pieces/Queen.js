import getValidBishopMoves from "./bishop";
import getValidRookMoves from "./rook";

export default function getValidQueenMoves(gameState, square, color) {
  return [
    ...getValidBishopMoves(gameState, square, color),
    ...getValidRookMoves(gameState, square, color),
  ];
}
