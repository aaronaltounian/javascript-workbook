'use strict';

let assert = require('assert');
let colors = require('colors');

// object to define which jobs can occupy which ships:
let jobTypes = {
  pilot: 'MAV',
  mechanic: 'Repair Ship',
  commander: 'Main Ship',
  programmer: 'Any Ship!'
};

// approach using function and prototype:
let CrewMember = function( name, job, specialSkill ) {
  this.name = name;
  this.job = job.toLowerCase();
  this.specialSkill = specialSkill;
}

CrewMember.prototype.enterShip = function( ship ) {
  // need to determine if the crewmember can enter the selected ship:
  let canEnterShip = false;
  // if the crewmember's job is 'programmer', they can enter any ship:
  if( this.job == 'programmer' ) {
    canEnterShip = true;
  }
  // or else figure out if the crewmember can enter the ship based on their job (defined in the jobTypes array):
  else {
    // iterate through each property in jobTypes:
    for( let key in jobTypes ) {
      // if the current property key in jobTypes equals this crewmember's job, AND the value of the current property key equals the ship's type,set canEnterShip to true and break out of the loop:
      if( key == this.job && jobTypes[key] == ship.type ) {
        canEnterShip = true;
        break;
      }
    }
  }
  // if crew member can enter ship, push this crewmember onto the ship's crew array, and set this crewmember's ship to the entered ship:
  if( canEnterShip ) {
    ship.crew.push(this);
    this.ship = ship;
  }
  // or else display error message:
  else {
    console.log( colors.red( `${this.job.charAt(0).toUpperCase()}${this.job.slice(1)}s can't enter the ${ship.name}!` ) );
    // necessary for the tests to pass:
    return false;
  }
}

let Ship = function( name, type, ability ) {
  this.name = name;
  this.type = type;
  this.ability = ability;
  this.crew = [];
}

Ship.prototype.missionStatement = function() {
      // if this ship's crew length is empty, no mission can occur:
      if( this.crew.length == 0 ) return "Can't perform a mission yet.";
      // or else if the ship has a crewmember, return the mission ability:
      else return this.ability;
}

// approach using classes and constructors:

// class to construct new crew members & define a function to enter ship:
// class CrewMember {
//   constructor( name, job, specialSkill ) {
//     // make new property keys for the new crewmember and use the parameters passed in for the values
//     this.name = name,
//     this.job = job.toLowerCase(),
//     this.specialSkill = specialSkill
//     // create property key named ship and set it to null for now:
//     this.ship = null;
//   }

//   // function to enter ship:
//   enterShip( ship ) {
//     let validEntry;
//     // iterate through each property in jobTypes:
//     if( this.job == 'programmer' ) {
//       validEntry = true;
//     }
//     else {
//       for( let key in jobTypes ) {
//         // if the current property key in jobTypes equals this crewmember's job, AND the value of the current property key equals the ship's type, push this crewmember onto the ship's crew array, and set this crewmember's ship to the ship that was passed into the function:
//         if( key == this.job && jobTypes[key] == ship.type ) {
//           validEntry = true;
//           break;
//           // ship.crew.push(this);
//           // this.ship = ship;
//         }
//       }
//     }
//     if( validEntry ) {
//       ship.crew.push(this);
//       this.ship = ship;
//     }
//     else console.log( colors.red( `${this.job.charAt(0).toUpperCase()}${this.job.slice(1)}s can't enter the ${ship.name}!` ) );
//     return false;
//   }
// }

// class to construct new ships and define a function to run a mission:
// class Ship {
//   constructor( name, type, ability ) {
//     // create property keys and use the passed in parameters to set values:
//     this.name = name,
//     this.type = type,
//     this.ability = ability,
//     // also create empty array called crew to push crewmembers onto using enterShip function:
//     this.crew = []
//   }

//   // create function to check if a ship has a crew & can therefore go on a mission:
//   missionStatement() {
//     // if this ship's crew length is empty, no mission can occur:
//     if( this.crew.length == 0 ) return "Can't perform a mission yet.";
//     // or else if the ship has a crewmember, return the mission ability:
//     else return this.ability;
//   }
// }

//tests
if (typeof describe === 'function'){
  describe('CrewMember', function(){
    it('should have a name, a job, a specialSkill and ship upon instantiation', function(){
      var crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      assert.equal(crewMember1.name, 'Rick Martinez');
      assert.equal(crewMember1.job, 'pilot');
      assert.equal(crewMember1.specialSkill, 'chemistry');
      assert.equal(crewMember1.ship, null);
    });

    it('can enter a ship', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      crewMember1.enterShip(mav);
      assert.equal(crewMember1.ship, mav);
      assert.equal(mav.crew.length, 1);
      assert.equal(mav.crew[0], crewMember1);
    });

    it('should not allow a crewmember into the wrong ship', function(){
      let crewMember1 = new CrewMember('Peter', 'pilot', 'surfing');
      let crewMember2 = new CrewMember('John', 'commander', 'crosswords');
      let crewMember3 = new CrewMember('Tanto', 'mechanic', 'smashing things');
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      let hermes = new Ship('Helical Electromagnetic Rover Matriculating Exo Ship', 'Main Ship', 'Interplanetary Space Travel');
      let reparo = new Ship('Reparo', 'Repair Ship', 'Fixing Broken Shit...');
      assert.equal(crewMember1.enterShip(hermes), false);
      assert.equal(crewMember2.enterShip(reparo), false);
      assert.equal(crewMember3.enterShip(mav), false)
    });

    it('should allow programmer into any ship', function(){
      let crewMember1 = new CrewMember('Judith Resnik', 'programmer', 'engineering');
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      let hermes = new Ship('Helical Electromagnetic Rover Matriculating Exo Ship', 'Main Ship', 'Interplanetary Space Travel');
      let reparo = new Ship('Reparo', 'Repair Ship', 'Fixing Broken Shit...');
      crewMember1.enterShip(mav);
      assert.equal(crewMember1.ship, mav);
      assert.equal(mav.crew.length, 1);
      assert.equal(mav.crew[0], crewMember1);
      crewMember1.enterShip(hermes);
      assert.equal(crewMember1.ship, hermes);
      assert.equal(hermes.crew.length, 1);
      assert.equal(hermes.crew[0], crewMember1);
      crewMember1.enterShip(reparo);
      assert.equal(crewMember1.ship, reparo);
      assert.equal(reparo.crew.length, 1);
      assert.equal(reparo.crew[0], crewMember1);
    });
  });

  describe('Ship', function(){
    it('should have a name, a type, an ability and an empty crew upon instantiation', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      assert.equal(mav.name, 'Mars Ascent Vehicle');
      assert.equal(mav.type, 'MAV');
      assert.equal(mav.ability, 'Ascend into low orbit');
      assert.equal(mav.crew.length, 0);
    });

    it('can return a mission statement correctly', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      let hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
      let crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
      assert.equal(mav.missionStatement(), "Can't perform a mission yet.");
      assert.equal(hermes.missionStatement(), "Can't perform a mission yet.");

      crewMember1.enterShip(mav);
      assert.equal(mav.missionStatement(), "Ascend into low orbit");

      crewMember2.enterShip(hermes);
      assert.equal(hermes.missionStatement(), "Interplanetary Space Travel");
    });
  });
}
