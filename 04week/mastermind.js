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
  // set board, solution, and win state boolean to their initial values:
  board = [];
  solution = '';
  youHaveWon = false;
  // generate a new solution:
  generateSolution();
}

// print function to add items to 'board' array in order to display previous guesses, as well as generate turn count for loss detection:
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
  // split guess and solution strings into discrete arrays:
  let solutionArray = solution.split('');
  let guessArray = guess.split('');

  // define variables to store numbers to use in the hint:
  let correctLetterLocations = 0;
  let correctLetters = 0;

  // iterate through the solution array and check if each character of the guess matches the solution at the same position; if so add one to correctLetterLocations:
  for( let i = 0; i < solutionArray.length; i++ ) {
    if( solutionArray[i] == guessArray[i] ) {
      correctLetterLocations++;
      solutionArray[i] = null;
    }
  }

  // iterate through arrays again to check for guess characters which match but aren't in the correct position:
  for( let i = 0; i < solutionArray.length; i++ ) {
    // define a variable to store the index number in the solution of each character in the guess array:
    let targetIndex = solutionArray.indexOf( guessArray[i] );
    // if the solution array index of the character at guessArray[i] is > -1 then the character must exist somewhere within the solution array; add one to correctLetters:
    if( targetIndex > -1 ) {
      correctLetters++;
      solutionArray[targetIndex] = null;
    }
  }
  return `${correctLetterLocations}-${correctLetters}`;
  //return colors.red(correctLetterLocations) + '-' + colors.white(correctLetters) ;
}

// made isValid function to check if the guessed letters are valid; wrote it this way so it still works if the letters array is changed:
let isValid = ( guess ) => {
  // define variable to store a count (4 valid letters in a guess results in validCount of 4):
  let validCount = 0;
  // iterate through the characters in guess:
  for( let character of guess ) {
    // iterate through each letter in the letters array:
    for( let letter of letters) {
      // if each character of the guess matches a letter within the array, add 1 to validCount:
      if( character == letter ) {
        validCount++;
      }
    }
  }
  // if validCount is 4, the guess is valid:
  if( validCount == 4 ) return true;
  else return false;
}

// create function to check if player is out of turns. i put this in its own function to simplify code later on:
let outOfTurns = () => {
  // if board array length is 10 then display loss message and reset the board:
  if( board.length == 10 ) {
    console.log( colors.bold.bgRed(`You ran out of turns! The solution was ${solution}.`) );
    console.log( colors.blue('Try again?') );
    reset();
  }
  // or else log how many turns have been taken and keep playing:
  else console.log(`Guess again. You've made ${board.length} turn(s) out of 10.`);
}

let mastermind = ( guess ) => {
  // solution reassignment for troubleshooting use (leave commented for normal gameplay):
  // solution = 'abcd';
  
  // make guess lowercase to avoid errors caused by unexpected capitalization:
  guess = guess.toLowerCase();

  // if guess length is not exactly 4 characters, or if the guess is not valid per the isValid function, log try again message:
  if( guess.length != 4 || !isValid(guess) ) {
    console.log( colors.red('Try again and guess four valid letters!') )
  }
  // or else if the guess is equal to the solution, set youHaveWon boolean to true:
  else if( guess == solution ) {
    youHaveWon = true;
    return 'You guessed it!';
  }
  // or else push the guess and the generated hint to the board array:
  else {
    let hint = generateHint( guess );
    board.push( `${guess} ${hint}` );
  }
}

function getPrompt() {
  // log message to explain what to do; wrote it like this so it still works if the letters array is modified:
  console.log( colors.bold(`--- Pick four letters between ${letters[0]} and ${letters[letters.length-1]}! ---`) );
  // begin prompt:
  rl.question('guess: ', (guess) => {
    // run the entered guess through the mastermind function:
    mastermind(guess);
    // print the board which displays all guesses and hints:
    printBoard();
    // if youHaveWon variable is true (see line 121), log win message and reset:
    if( youHaveWon ) {
      console.log( colors.bold.green('You guessed it!') );
      console.log( colors.bold.blue('Play again?') );
      reset();
    }
    // or else run the outOfTurns function (see line 98) to check for loss state or if the game should continue:
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
