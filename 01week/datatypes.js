'use strict'
// 1. get date & time and console log them:
const date = new Date();
console.log('The date and time is' + ' ' + date + '.');

// 2. turn a number into a string and log it:
function numToString(num) {
  let n = num.toString();
  console.log('The number turned into a string is' + ' ' + n + '.');
}
numToString(666);
numToString(1080);

// 3. parse a string to return a number:
function stringToNum(string) {
  console.log('The string parsed into a number is' + ' ' + parseInt(string) + '.');
}
stringToNum('1234');
stringToNum('5280');

// 4. function to return type of variable:
function type(x) {
  console.log('The variable'+ ' ' + x + ' ' + 'is a(n)' + ' ' + typeof x + '.');
}
// 5. some variable examples run through the type function:
let declaredButUndefined;
let nullVar = null;
type('Hello');
type(1234);
type(NaN);
type(declaredButUndefined);
type(!NaN);
type(12 === 12);
type(nullVar);
type(date);

// 6. function to add two numbers:
function add(a, b) {
  let sum = a + b;
  console.log('The result of' + ' ' + a + ' + ' + b + ' ' + 'is' + ' ' + sum + '.');
}
add(2, 6);
add(15, 32);
add(1028, 900);

// 7. function which only runs if two things are both true:
function bothTrue(a, b) {
  if(a && b) {
    console.log('Both things are true!');
  }
}
// not both true:
bothTrue(10<8, 15<20);
// both true:
bothTrue(10>8, 15<20);

// 8. function which runs if at least one of two things is true:
function oneTrue(a, b) {
  if(a || b) {
    console.log('At least one thing is true!');
  }
}
oneTrue(!NaN, NaN);
oneTrue(10<8, 15<20);

// 9. function which runs if two things are both false:
function bothFalse(a, b){
  if(!a && !b) {
    console.log('Both things are false!');
  }
}
bothFalse(!NaN, NaN);
bothFalse(10<8, 15>20);
