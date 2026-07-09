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
    if (board[row[col]] == "") {
      return false;
    }
    board[row][col] = marker;
    // console.log(getBoard());
  }

  const resetBoard = () => {
    board.forEach(row => {
      row.fill("");
    });
    console.log(getBoard());
  } 

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
  
  // copy the board and display it in an easy to read format
  const printBoard = () => {
    const board = gameboard.getBoard();
    board.forEach((row) => {
      console.log(row.map((cell) => cell || ".").join(" | "))
    });
  }

  const printNewRound = () => {
    printBoard();
    console.log(`It's ${getActivePlayer().getName()}'s Turn`);
  }

  const playRound = (row, col) => {
    gameboard.placeMarker(row, col, activePlayer.getMarker());
    switchActivePlayer();
    printNewRound();
  }

  // Display the board and announce the first player's turn
  printNewRound();

  return { getActivePlayer, switchActivePlayer, printNewRound, playRound, }
})();