class Game {
  turn = 0;

  whitePieces = [];
  blackPieces = [];

  canWhiteCastleQueenside = true;
  canWhiteCastleKingside = true;
  canBlackCastleQueenside = true;
  canBlacCastleKingside = true;

  clickLayer = null;
  piecesElement = null;
  cellsElement = null;

  constructor() {
    this.clickLayer = document.querySelector("#click-layer");
    this.piecesElement = document.querySelector("#pieces");
    this.cellsElement = document.querySelector("#cells");
  }
}

export default new Game();
