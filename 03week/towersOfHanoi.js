'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// the 'towers', as an object which contains three arrays:
let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// a couple variables to count number of moves per game as well as best score:
let moveCount = 0;
let bestCount = 0;

// reset function to reset when a game is complete:
let reset = () => {
  stacks = {
    a: [4, 3, 2, 1],
    b: [],
    c: []
  };
  moveCount = 0;
}

let printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// validity check function with a switch statement to explicitly define valid inputs:
let isValid = ( startStack, endStack ) => {
  switch( startStack ) {
    case 'a':
    case 'b':
    case 'c':
      break;
    default:
      return false;
  }
  switch( endStack ) {
    case 'a':
    case 'b':
    case 'c':
      return true;
    default:
      return false;
  }
}

// function to check for legality of attempted move:
let isLegal = (startStack, endStack) => {
  // define a couple variables to represent the final item in each selected stack for comparsion purposes:
  let lastStart = stacks[startStack].length - 1;
  let lastEnd = stacks[endStack].length - 1;
  // if the final item in the chosen startStack is less than the final item in the chosen endStack, OR if the chosen endStack is empty (undefined), return true (move is valid):
  if( (stacks[startStack][lastStart] < stacks[endStack][lastEnd]) || stacks[endStack][lastEnd] == undefined ) {
    return true;
  }
  else return false;
}

// check for win: if the final tower is full, returns true:
let checkForWin = () => {
  if( stacks.c.length == 4 ) {
    return true;
  }
  else return false;
}

let towersOfHanoi = (startStack, endStack) => {
  // check if the inputs are valid:
  if(!isValid(startStack, endStack)) {
    console.log('Try again, choose either "a", "b", or "c"!');
  }
  // then check if the move is legal:
  else if( !isLegal(startStack, endStack) ) {
    console.log('Try again with a valid move!');
  }
  // if it's valid and legal, move the piece:
  else {
    // pop the final element in the array defined by startStack, and push it to the array defined by endStack:
    stacks[endStack].push( stacks[startStack].pop() );
    // add one to the number of moves which have occured:
    moveCount++
  }
  // see if checkForWin() evaluates as true:
  if( checkForWin() ) {
    // if game is won in less moves than the best score (or if it's the first score), update best score:
    if( (moveCount < bestCount) || (bestCount == 0) ) {
      bestCount = moveCount;
    }
    // console.log the win, display how many moves it took to win and the player's best score:
    console.log(`You won in ${moveCount} moves! Your best was ${bestCount} moves!`);
    // reset the board:
    reset();
  }
}

let getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [], c: [4, 3, 2, 1] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
