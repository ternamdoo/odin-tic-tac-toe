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
  
  return { getBoard }
})();