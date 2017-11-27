const person = {
  name: 'John',
  age: 21,
};

const updatePerson = (object) => {
  object = {
    name: 'Moo',
    age: 29,
  };
};

updatePerson(person);

console.log(person);
