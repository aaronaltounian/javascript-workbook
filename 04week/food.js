
let logic = (answer) => {
    // answer = answer.toLowerCase();
    switch(answer){
        case 'apple':
            console.log('Yum!');
            break;
        case 'banana':
            console.log('Gross!');
            break;
        case 'peach':
            console.log('Cool!');
            break;
        default:
            console.log(`I've never heard of ${answer} fruit.`)
    }
}
module.exports = logic;

// cli.question("What's your favourite fruit? ", (answer) => {
//     answer = answer.toLowerCase();
//     if(answer == "apple"){
//         console.log('Yum!');
//     }
//     else if( answer == "banana" ){
//         console.log('Gross!');
//     }
//     else if ( answer == "peach" ){
//         console.log('Cool!');
//     }
//     else {
//         console.log(`I've never heard of ${answer} fruit.`)
//     }
    
//     cli.close();
// })

