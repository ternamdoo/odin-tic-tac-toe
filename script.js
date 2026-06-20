console.log("It works!")

const gameboard = (function Gameboard() {
  const ROWS = 3;
  const COLS = 3;
  const board = [];

  for (let i = 0; i < ROWS; i++) {
    board[i] = [];
    for (let j = 0; j < COLS; j++) {
      board[i].push("");
    }
  }

  const getBoard = () => board;
  
  const placeMarker = (row, col, marker) => {
    board[row][col] = marker;
    console.log(getBoard());
  }

  return { getBoard, placeMarker, }
})();