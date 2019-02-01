'use strict';

let assert = require('assert');

// object to define which jobs can occupy which ships:
let jobTypes = {
  pilot: 'MAV',
  mechanic: 'Repair Ship',
  commander: 'Main Ship',
  programmer: 'Any Ship!'
};

// class to construct new crew members & define a function to enter ship:
class CrewMember {
  constructor( name, job, specialSkill ) {
    // make new property keys for the new crewmember and use the parameters passed in for the values
    this.name = name,
    this.job = job.toLowerCase(),
    this.specialSkill = specialSkill
    // create property key named ship and set it to null for now:
    this.ship = null;
  }

  // function to enter ship:
  enterShip( ship ) {
    // iterate through each property in jobTypes:
    for( let key in jobTypes ) {
      // if the current property key in jobTypes equals this crewmember's job, AND the value of the current property key equals the ship's type, push this crewmember onto the ship's crew array, and set this crewmember's ship to the ship that was passed into the function:
      if( key == this.job && jobTypes[key] == ship.type ) {
        ship.crew.push(this);
        this.ship = ship;
      }
    }
  }
}

// class to construct new ships and define a function to run a mission:
class Ship {
  constructor( name, type, ability ) {
    // create property keys and use the passed in parameters to set values:
    this.name = name,
    this.type = type,
    this.ability = ability,
    // also create empty array called crew to push crewmembers onto using enterShip function:
    this.crew = []
  }

  // create function to check if a ship has a crew & can therefore go on a mission:
  missionStatement() {
    // if this ship's crew length is not 1, no mission can occur:
    if( this.crew.length !== 1 ) return "Can't perform a mission yet.";
    // or else if the ship has a crewmember, return the mission ability:
    else return this.ability;
  }
}

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
