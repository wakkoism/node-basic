"use strict";

var pet = {
  name: 'Moo Cow',
  type: 'Dinosaur',
  gender: 'male',
};

function printPet(pet) {
  var hisHer = 'his';
  if (pet.gender === 'female') {
    hisHer = 'her';
  }
  return 'I own a ' + pet.type + ', ' + hisHer + ' name is ' + pet.name + '.';
}

console.log(printPet(pet));
