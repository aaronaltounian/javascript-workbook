'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let playerTurn = 'X';

let printBoard = () => {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

// define reset function to reset board after a game:
let reset = () => {
  board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];
  playerTurn = 'X';
  turnCount = 1;
}

// make a string depending on the playerTurn, e.g. 'XXX' or 'OOO' to compare against:
let playerString = playerTurn + playerTurn + playerTurn;

let horizontalWin = () => {
  // method for row win state using .every():
  if(
    (board[0].every(x => x == playerTurn)) ||
    (board[1].every(x => x == playerTurn)) ||
    (board[2].every(x => x == playerTurn))
  ) {
    return true;
  }
  else return false;

  // method using for/in with string comparators and joining the row arrays together (not working as intended):
  // for( let i in board ) {
  //   // join each subarray into a string with no spaces:
  //   let rowString = board[i].join('');
  //   // compare rowString against playerString to detect horizontal win:
  //   if( rowString == playerString ) {
  //     return true;
  //   }
  //   else return false;
  // }
}

let verticalWin = () => {
  // brute force method that i'm not super happy with, checking each possible win iteration using && and || in an if statement:
  if(
    (board[0][0] == playerTurn && board[1][0] == playerTurn && board[2][0] == playerTurn) ||
    (board[0][1] == playerTurn && board[1][1] == playerTurn && board[2][1] == playerTurn) ||
    (board[0][2] == playerTurn && board[1][2] == playerTurn && board[2][2] == playerTurn)
  ) {
    return true;
  }
  else return false;
}

let diagonalWin = () => {
  // check middle square first, because it can't be a diagonal win if the middle square isn't occupied:
  if( board[1][1] != playerTurn ) {
    return false;
  }
  // else brute force check the remaining spaces required to make a diagonal win:
  else if((board[0][0] == playerTurn && board[2][2] == playerTurn) || 
          (board[0][2] == playerTurn && board[2][0] == playerTurn)) {
    return true;
  }
  else return false;
}

// make checkForWin return true if any of the win state checks are true:
let checkForWin = () => {
  if( horizontalWin() || verticalWin() || diagonalWin() ) {
    return true;
  }
  else return false;
}

// create a function to return true if the choices are valid (note: added number cases cuz prewritten test wouldn't work with strings):
let choiceChecker = ( row, column ) => {
  switch(row){
    case '0':
    case '1':
    case '2':
    case 0:
    case 1:
    case 2:
      break;
    default:
      return false;
  }
  switch(column){
    case '0':
    case '1':
    case '2':
    case 0:
    case 1:
    case 2:
      return true;
    default:
      return false;
  }
}

// create function to flip turn (just to make it easier to read in the ticTacToe function):
let flipTurn = () => {
  playerTurn == 'X' ? playerTurn = 'O' : playerTurn = 'X';
}

// create turn counter variable as storage to help determine a tie/cat's game:
let turnCount = 1;

let ticTacToe = ( row, column ) => {
  // Check if turn is valid:
  let isValid = choiceChecker(row, column);
  // If turn is not valid, say so:
  if( !isValid ) {
    console.log('Try again, enter a valid row and column!');
  }
  // else if chosen space is already occupied, say so:
  else if( board[row][column] != ' ' ) {
    console.log('That space is already taken, try again!');
  }
  // or else put the current turn ('X' or 'O') in the array space represented by the inputs:
  else {
    board[row][column] = playerTurn;
    // check if there's a win, if so log it and reset the board:
    if( checkForWin() ) {
      console.log( `${playerTurn} wins!` );
      reset();
    }
    // or else if there's no winner and all the spaces are full, log tie game and reset:
    else if( !checkForWin() && turnCount == 9 ) {
      console.log( "Cat's game! Tie!" );
      reset();
    }
    // or else flip the turn and add 1 to the turn counter:
    else {
      flipTurn();
      turnCount++;
    }
  }
}

let getPrompt = () => {
  printBoard();
  console.log( `It's player ${playerTurn}'s turn.` );
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });

}

// Tests

if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}
