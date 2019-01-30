let logic = require('./food');
let readline = require('readline');

let cli = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
cli.question('What is your favourite fruit? ', (answer) => {
    logic(answer);
})
