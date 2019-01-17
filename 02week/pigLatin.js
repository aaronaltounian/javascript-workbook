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
  // define array containing vowels:
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  // use a for loop to iterate through the letters of the word:
  for ( let i = 0; i <= word.length; i++ ) {
    //use a for loop to iterate through the vowels in the array:
    for ( let v = 0; v <= vowels.length; v++ ) {
      // if the first letter in the word is not a vowel, find the first vowel by checking each letter of the input word against each vowel within the array:
      if ( word[0] !== vowels[v] ) {
        // if the first vowel is 'u' check if it has a 'q' before it and if so split the word after the 'u':
        if ( word[i] == 'u' && word[i - 1] == 'q') {
          return word = word.substring(i+1) + word.substring(0, (i+1)) + 'ay';
        }
        // otherwise just split the word at the first vowel and make the new pig latin word:
        else if ( word[i] == vowels[v] ) {
          return word = word.substring(i) + word.substring(0, i) + 'ay';
        }
      }
      // or else if the first letter in the word is a vowel:
      else return word + 'yay';
    }
  }
}

//   vvv   !!!   Alternate method with regex   !!!   vvv   !!!   vvv   !!!   Alternate method with regex   !!! vvv
/*
function pigLatin(a) {

  // make input lowercase and trim it:
  let word = a.toLowerCase().trim();
  // define search letters (vowels) as a variable:
  let regex = /[aeiou]/;
  // check if first letter is a vowel, and if so append 'yay' and return the new piglatin word:
  if (word[0].match(regex)){
    // make piglatin word & return it:
    return word = word + 'yay';
  } 
  // or if the word starts with a consonant(s) then split the word at the first vowel, move the beginning of the word to the end and append 'ay', then return the new piglatin word:
  else {
    // get the index number of the first vowel in the word:
    let indexedVowel = word.indexOf(word.match(regex));
    // make the new word equal to a substring of the input beginning at the index number of the first vowel, plus a substring of the input beginning at 0 which ends at the index number of the first vowel, plus 'ay', then return it:
    return word = word.substring(indexedVowel) + word.substring(0, indexedVowel) + 'ay';
  }
}
*/


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
