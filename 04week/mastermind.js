'use strict';

const assert = require('assert');
const readline = require('readline');
const colors = require('colors');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
let youHaveWon = false;

// create function to reset game after win/loss:
let reset = () => {
  board = [];
  solution = '';
  youHaveWon = false;
  generateSolution();
}

// print function to add items to 'board' array in order to display previous guesses as well as generate turn count:
function printBoard() {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

// generate random solution based on the letters array:
function generateSolution() {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

// define getRandomInt function for use in the generateSolution function:
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// generate hint by displaying both the number of correctly guessed letter locations, as well as the number of correctly guessed letters are not in the right order:
function generateHint( guess ) {
  let solutionArray = solution.split('');
  let guessArray = guess.split('');
  let correctLetterLocations = 0;
  let correctLetters = 0;

  for( let i = 0; i < solutionArray.length; i++ ) {
    if( solutionArray[i] == guessArray[i] ) {
      correctLetterLocations++;
      solutionArray[i] = null;
    }
  }

  for( let i = 0; i < solutionArray.length; i++ ) {
    let targetIndex = solutionArray.indexOf( guessArray[i] );
    if( targetIndex > -1 ) {
      correctLetters++;
      solutionArray[targetIndex] = null;
    }
  }
  return `${correctLetterLocations}-${correctLetters}`;
  //return colors.red(correctLetterLocations) + '-' + colors.white(correctLetters) ;
}

let isValid = ( guess ) => {
  let validCount = 0;
  for( let character of guess ) {
    for( let letter of letters) {
      if( character == letter ) {
        validCount++;
      }
    }
  }
  if( validCount == 4 ) return true;
  else return false;
}

let outOfTurns = () => {
  if( board.length == 10 ) {
    console.log( colors.bold.bgRed(`You ran out of turns! The solution was ${solution}.`) );
    console.log( colors.blue('Try again?') );
    reset();
  }
  else console.log(`Guess again. You've made ${board.length} turns out of 10.`);
}

let mastermind = ( guess ) => {
   solution = 'abcd';
  guess = guess.toLowerCase();

  if( guess.length != 4 || !isValid(guess) ) {
    console.log( colors.red('Try again and guess four valid letters!') )
  }
  else if( guess == solution ) {
    youHaveWon = true;
    return 'You guessed it!';
  }
  else {
    let hint = generateHint( guess );
    board.push( `${guess} ${hint}` );
  }
}

function getPrompt() {
  console.log( colors.bold(`--- Pick four letters between ${letters[0]} and ${letters[letters.length-1]}! ---`) );
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    if( youHaveWon ) {
      console.log( colors.bold.green('You guessed it!') );
      console.log( colors.bold.blue('Play again?') );
      reset();
    }
    else outOfTurns();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.strictEqual(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.strictEqual(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
