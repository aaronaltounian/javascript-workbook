'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function Checker( color ) {
  // Your code here
  // color = 'white' ? this.symbol = String.fromCharCode(0x125CB) : this.symbol = String.fromCharCode(0x125CF);
  if( color == 'white' ) this.symbol = String.fromCharCode(0x125CF)
  else this.symbol = String.fromCharCode(0x125CB);
}

class Board {
  constructor() {
    this.grid = []
    this.checkers = []
  }
  // method that creates an 8x8 array, filled with null values
  createGrid() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null);
      }
    }
  }
  viewGrid() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  }

  // Your code here
  createCheckers() {
    // pieces are either black or white
    let whitePosition = [
      [0, 1], [0, 3], [0, 5], [0, 7],
      [1, 0], [1, 2], [1, 4], [1, 6],
      [2, 1], [2, 3], [2, 5], [2, 7]
    ];

    let blackPosition = [
      [5, 0], [5, 2], [5, 4], [5, 6],
      [6, 1], [6, 3], [6, 5], [6, 7],
      [7, 0], [7, 2], [7, 4], [7, 6]
    ];

    for( let i = 0; i < 12; i++ ) {
      let whiteChecker = new Checker( 'white' );
      let whiteRow = whitePosition[i][0];
      let whiteColumn = whitePosition[i][1];
      this.checkers.push(whiteChecker);
      this.grid[whiteRow][whiteColumn] = whiteChecker;
    }

    for( let i = 0; i < 12; i++ ) {
      let blackChecker = new Checker( 'black' );
      let blackRow = blackPosition[i][0];
      let blackColumn = blackPosition[i][1];
      this.checkers.push(blackChecker);
      this.grid[blackRow][blackColumn] = blackChecker;
    }
  }
}

class Game {
  constructor() {
    this.board = new Board;
  }
  start() {
    this.board.createGrid();
    this.board.createCheckers();
  }

  moveChecker( start, end ) {
    let startRow = parseInt(start[0]);
    let startColumn = parseInt(start[1]);
    let endRow = parseInt(end[0]);
    let endColumn = parseInt(end[1]);

    if( isValidInput(startRow, startColumn, endRow, endColumn) && isLegal(startRow, startColumn, endRow, endColumn) ) {
      this.board.grid[endRow][endColumn] = this.board.grid[startRow][startColumn];
      this.board.grid[startRow][startColumn] = null;

      if( Math.abs(endRow - startRow) == 2 ) {
        let killedRow = endRow - startRow > 0 ? startRow + 1 : endRow + 1;
        let killedColumn = endColumn - startColumn > 0 ? startColumn + 1 : endColumn + 1;

        this.board.grid[killedRow][killedColumn] = null;
        this.board.checkers.pop();
        // let removeChecker = this.board.checkers.indexOf(this.grid[killedRow][killedColumn]);
        // this.board.checkers.splice(removeChecker, 1);
      }
    }
    else console.log('Try again with a legal move.');
  }
}

let isValidInput = function( startRow, startColumn, endRow, endColumn ) {
  let validStart = ( startRow >= 0 && startRow <=8 ) && ( startColumn >= 0 && startColumn <= 8 );
  let validEnd = ( endRow >= 0 && endRow <= 8 ) && ( endColumn >= 0 && endColumn <= 8 );
  return ( validStart && validEnd );
}

let isLegal = function( startRow, startColumn, endRow, endColumn ) {
  let rowDifference = Math.abs( endRow - startRow );
  let columnDifference = Math.abs( endColumn - startColumn );
  if( (rowDifference == 1 && columnDifference == 1) || (rowDifference == 2 && columnDifference == 2) ) return true;
  else return false;
}

function getPrompt() {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();


// Tests
if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', () => {
    it('should move a checker', () => {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}
