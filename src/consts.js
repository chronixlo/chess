export const BOARD_SIZE = 8;

export const PIECE_VALUES = {
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9,
  k: 100,
};

export const PIECE_CHARACTERS = {
  b: "♝",
  q: "♛",
  r: "♜",
  k: "♚",
  p: "♟",
  n: "♞",
};

const boardString = `br,bn,bb,bq,bk,bb,bn,br
bp,bp,bp,bp,bp,bp,bp,bp
,,,,,,,
,,,,,,,
,,,,,,,
,,,,,,,
wp,wp,wp,wp,wp,wp,wp,wp
wr,wn,wb,wq,wk,wb,wn,wr`;

export const INITIAL_BOARD = boardString.split("\n").map((r) => r.split(","));
