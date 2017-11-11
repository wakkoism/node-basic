const person = {
  name: 'Andrew',
  age: 24,
};

let personJSON = JSON.stringify(person);

console.log(personJSON);
console.log(typeof personJSON);

let personOject = JSON.parse(personJSON);

console.log(personOject.name);
console.log(typeof personOject);

console.log('---- CHALLENGE AREA ----');

const animal = '{"name" : "MooCow"}';
// Challenge is to convert JS object and add age property.
let animalOjbect = JSON.parse(animal);

animalOjbect.age = 7;

console.log(JSON.stringify(animalOjbect));