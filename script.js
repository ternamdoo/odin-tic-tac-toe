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
    if (board[row][col] === "") {
      board[row][col] = marker;
      return true;
    } else {
      return false;
    }
  };

  const resetBoard = () => {
    board.forEach(row => {
      row.fill("");
    });
    console.log(getBoard());
  };

  return { getBoard, placeMarker, resetBoard, }
})();

function Player(name, marker) {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker, }
}

// This object will handle all the gameplay and winning logic
const gameController = (function gameController() {
  const player1 = Player('Player1', 'X');
  const player2 = Player('Player2', 'O');
  
  let activePlayer = player1;
  const getActivePlayer = () => activePlayer;
  const switchActivePlayer = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };

  const checkWin = () => {
    const board = gameboard.getBoard();

    // Each sub-array in the array below represents one of all 8 possible winning combinations
    // Each sub-array contains three child arrays, each with two elements representing the x and y indices of the cells
    // that make up the winning combinations 
    const winningCombos = [
      [[0,0], [0,1], [0,2]],
      [[1,0], [1,1], [1,2]],
      [[2,0], [2,1], [2,2]],
      [[0,0], [1,0], [2,0]],
      [[0,1], [1,1], [2,1]],
      [[0,2], [1,2], [2,2]],
      [[0,0], [1,1], [2,2]],
      [[0,2], [1,1], [2,0]],
    ];

    // check returns true is a win condition is met, and false if it is not met.
    const check = winningCombos.some(([a, b, c]) => {
      return (
        board[a[0]][a[1]] !== "" && 
        board[a[0]][a[1]] === board[b[0]][b[1]] &&
        board[b[0]][b[1]] === board[c[0]][c[1]]
      );
    });
    return check;
  };
  
  const checkTie = () => {
    return gameboard.getBoard().every((row) => row.every((cell) => cell !== ""));
  };

  // copy the board and display it in an easy to read format
  const printBoard = () => {
    const board = gameboard.getBoard();
    board.forEach((row) => {
      console.log(row.map((cell) => cell || ".").join(" | "))
    });
  };

  const printNewRound = () => {
    printBoard();
    console.log(`It's ${getActivePlayer().getName()}'s Turn`);
  };

  const playRound = (row, col) => {
    const validMove = gameboard.placeMarker(row, col, activePlayer.getMarker());
    if (validMove) {
      switchActivePlayer();
      printNewRound();
    } else {
      console.log("You picked a marked spot. Look at the board and place your marker in an unmarked spot");
      printNewRound();
    }
  };

  // Display the board and announce the first player's turn
  printNewRound();

  return { getActivePlayer, switchActivePlayer, printNewRound, playRound, checkWin, checkTie, }
})();