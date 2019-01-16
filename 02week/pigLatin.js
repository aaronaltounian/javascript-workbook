'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function pigLatin(a) {

  // make input lowercase and trim it:
  let word = a.toLowerCase().trim();
  // define search letters (vowels) as a variable:
  let regex = /[aeiou]/g;
  // check if first letter is a vowel, and if so append 'yay' and return the new piglatin word:
  if (word[0].match(regex)){
    // make piglatin word & return it:
    return word = word + 'yay';
  } 
  // or if the word starts with a consonant(s) then split the word at the first vowel, move the beginning of the word to the end and append 'ay', then return the new piglatin word:
  else {
    // get the index number of the first vowel in the word:
    let indexedVowel = word.indexOf(word.match(regex)[0]);
    // make the new word equal to a substring of the input beginning at the index number of the first vowel, plus a substring of the input beginning at 0 which ends at the index number of the first vowel, plus 'ay', then return it:
    return word = word.substring(indexedVowel) + word.substring(0, indexedVowel) + 'ay';
  }
}


function getPrompt() {
  rl.question('word ', (answer) => {
    console.log( pigLatin(answer) );
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();

}
