'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function rockPaperScissors(a, b) {
  
  // define variables for win states:
  const tie = "It's a tie!";
  const player1Wins = "Hand one wins!";
  const player2Wins = "Hand two wins!";
  // take the function's arguments (player choices) and make them lowercase so they still run even if a player capitalizes a letter:
  let hand1 = a.toLowerCase().trim();
  let hand2 = b.toLowerCase().trim();

  // check if the choices are valid/create a boolean so it can be compared in the results stage:
  function choiceChecker(hand1, hand2) {
    switch(hand1){
      // if player 1 picks a valid turn then break and move on to checking player 2, or else return that it's a false move:
      case 'rock':
      case 'paper':
      case 'scissors':
        break;
      default: 
        return false;
    }
    // check player 2's choice and if both player's choices are valid then return true, if player 2's choice is not valid then return false:
    switch(hand2){
      case 'rock':
      case 'paper':
      case 'scissors':
        return true;
      default: 
        return false;
    }
  }
  // define a boolean variable created from the validity checking function:
  let isValid = choiceChecker(hand1, hand2);

  //     !!!   Win States   !!!
  // if the choices aren't valid, say so:
  if (!isValid) {
    return 'Try again, choose either rock, paper, or scissors!';
  }
  // if the choices are the same, the game results in a tie:
  else if (hand1 === hand2) {
    return tie;
  } 
  // or else if player one picks rock, determine winner based off player 2's choice:
  else if (hand1 === 'rock') {
    if (hand2 === 'paper') {
      return player2Wins;
    } else {
      return player1Wins;
    }
  }
  // or else if player 1 picks paper, determine winner based off player 2's choice:
  else if (hand1 === 'paper') {
    if(hand2 === 'rock') {
      return player1Wins;
    } else {
      return player2Wins;
    }
  }
  // finally, if player 1 picks scissors, determine winner based off player 2's choice:
  else if (hand1 === 'scissors') {
    if (hand2 === 'rock') {
      return player2Wins;
    } else {
      return player1Wins;
    }
  }
}

function getPrompt() {
  rl.question('hand1: ', (answer1) => {
    rl.question('hand2: ', (answer2) => {
      console.log( rockPaperScissors(answer1, answer2) );
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#rockPaperScissors()', () => {
    it('should detect a tie', () => {
      assert.equal(rockPaperScissors('rock', 'rock'), "It's a tie!");
      assert.equal(rockPaperScissors('paper', 'paper'), "It's a tie!");
      assert.equal(rockPaperScissors('scissors', 'scissors'), "It's a tie!");
    });
    it('should detect which hand won', () => {
      assert.equal(rockPaperScissors('rock', 'paper'), "Hand two wins!");
      assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
    });
    it('should scrub input to ensure lowercase with "trim"ed whitepace', () => {
      assert.equal(rockPaperScissors('rOcK', ' paper '), "Hand two wins!");
      assert.equal(rockPaperScissors('Paper', 'SCISSORS'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock ', 'sCiSsOrs'), "Hand one wins!");
    });
  });
} else {

  getPrompt();

}
