'use strict'

// copied and pasted lines 4-13 from previous homework since that's where carsInReverse was defined & wasn't quite sure why it was mentioned in this homework, if i was supposed to make a new array or what, so this is what you get:
let cars = ['Ford', 'Lotus', 'Renault', 'Peugeot'];
// console.log(cars);
let moreCars = ['Pagani', 'Porsche', 'Audi', 'Honda'];
let totalCars = cars.concat(moreCars);
// console.log(totalCars.indexOf('Honda'));
// console.log(totalCars.lastIndexOf('Ford'));
let stringOfCars = totalCars.join(' ');
// console.log(stringOfCars);
totalCars = stringOfCars.split(' ');
let carsInReverse = totalCars.reverse();

// 1. Use a for loop to console.log each item in the array carsInReverse:
for( let i = 0; i < carsInReverse.length; i++ ) {
    console.log( carsInReverse[i] );
}

// 2. Create an object called persons with the following data: 
// firstName: "Jane" lastName: "Doe" birthDate: "Jan 5, 1925" gender: "female"
const persons = {
    firstName: 'Jane',
    lastName: 'Doe',
    birthDate: 'Jan 5, 1925',
    gender: 'female'
}

// 3. Use a for...in loop to console.log each key in persons:
for( let key in persons ) {
    console.log(key);
}

// 4. Then use a for...in loop and if state to console.log the value associated with the key birthDate:
for( let key in persons ) {
    if( key == 'birthDate' ) {
        console.log( persons[key] );
    }
}

// 5. Use a for loop to console.log the numbers 1 to 1000:
for( let i = 1; i <= 1000; i++ ) {
    console.log(i);
}

// 6. Use a do...while loop to console.log the numbers from 1 to 1000:
let x = 0;
do {
    x += 1;
    console.log(x);
}
while ( x < 1000 );

/*

7a. When is a for loop better than a while loop?
    A for loop is useful when the required number of iterations is known.

7b. How is the readability of the code affected?
    In a for loop the number of times the loop runs can be discerned from looking at the parameters, a while loop isn't as obvious as to how many times it will iterate before ending.

8. What is the difference between a for loop and a for...in loop?
    A for/in loop is designed to loop through an object and return the key of each key-value pair within it e.g. for(let key in object).
    A for loop defines an incrementing variable as well as an end condition for the loop. 

9. What is the difference between a while loop and a do...while loop?
    A do loop and a do/while loop are very similar, but a do/while loop will execute the do block at least once before checking the while condition, but a while loop checks for the condition before running anything within the while block.
*/
