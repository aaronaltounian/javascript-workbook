const rockPaperScissors = require('./rockPaperScissors');
const assert = require('assert');

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
    it('should detect all scenarios in which hand one wins', () => {
      assert.strictEqual(rockPaperScissors('rock', 'scissors'), 'Hand one wins!');
      assert.strictEqual(rockPaperScissors('paper', 'rock'), 'Hand one wins!');
      assert.strictEqual(rockPaperScissors('scissors', 'paper'), 'Hand one wins!');
    });
    it('should detect all scenarios in which hand two wins', () => {
      assert.strictEqual(rockPaperScissors('rock', 'paper'), 'Hand two wins!');
      assert.strictEqual(rockPaperScissors('paper', 'scissors'), 'Hand two wins!');
      assert.strictEqual(rockPaperScissors('scissors', 'rock'), 'Hand two wins!');
    });
    it('should only accept valid inputs', () => {
      assert.strictEqual(rockPaperScissors('wreck', 'paper'), 'Try again, choose either rock, paper, or scissors!');
      assert.strictEqual(rockPaperScissors('rock', 'proper'), 'Try again, choose either rock, paper, or scissors!');
      assert.strictEqual(rockPaperScissors('nothing', 'wrong'), 'Try again, choose either rock, paper, or scissors!');
    });
  });