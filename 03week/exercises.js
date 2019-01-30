'use strict'

// 1. Create array 'cars' with 4 different types of cars & console.log:
let cars = ['Ford', 'Lotus', 'Renault', 'Peugeot'];
console.log(cars);

//2. Create array 'morecars' with 4 more types of cars and concat with cars:
let moreCars = ['Pagani', 'Porsche', 'Audi', 'Honda'];
let totalCars = cars.concat(moreCars);

//3. console.log the indexOf 'Honda' and lastIndexOf 'Ford':
console.log(totalCars.indexOf('Honda'));
console.log(totalCars.lastIndexOf('Ford'));

//4. Use join method to convert the array totalCars to a string:
let stringOfCars = totalCars.join(' ');
console.log(stringOfCars);

//5. Use split method to convert stringOfCars back to an array:
totalCars = stringOfCars.split(' ');

//6. Use reverse method to create an array carsInReverse from totalCars:
let carsInReverse = totalCars.reverse();

//7: Use sort method to put carsInReverse in alphabetical order:
carsInReverse.sort();
// prediction: 'Audi' is in index 0:
console.log(carsInReverse.indexOf('Audi'));

//8. Use slice method to remove Ford and Honda from carsInReverse,
// and move them into a new array removedCars:
let removedCars =  carsInReverse.slice(1, 3);
console.log(removedCars);

//9. Use splice method to remove 2nd and 3rd items in carsInReverse & replace them with 'Ford' and 'Honda' (which is weird because the 2nd and 3rd items are already Ford and Honda...):
carsInReverse.splice(1, 2, 'Ford', 'Honda');
console.log(carsInReverse);

//10. Use push method to add the types of cars removed using splice method to carsInReverse:
carsInReverse.push('Ford', 'Honda');
console.log(carsInReverse);

//11. Use pop method to remove and console.log the last item in carsInReverse:
console.log(carsInReverse.pop());

//12. Use shift method to remove and console.log the first item in carsInReverse:
console.log(carsInReverse.shift());

//13. Use the unshift method to add a new type of car to the beginning of carsInReverse:
carsInReverse.unshift('Volkswagen');
console.log(carsInReverse);

//14. Create an array called numbers with the following items: 23, 45, 0, 2, write code that will add 2 to each item in the array numbers.
let numbers = [ 23, 45, 0, 2 ];
for(let x in numbers){
    numbers[x] += 2;
    console.log(numbers[x]);
}
