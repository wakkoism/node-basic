const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const todos = [
  {
    id: 1,
    description: 'Meet mom for lunch',
    completed: false,
  },
  {
    id: 2,
    description: 'Go to market',
    completed: false,
  },
  {
    id: 3,
    description: 'This is a challenge request',
    completed: true,
  },
];
// Function that finds the key value pair inside of the array of objects.
const getKeyByValue = (object, key, value) => object.find(element => element[key] === value);

app.get('/', (request, response) => {
  response.send('Todo API Root');
});

app.get('/todos', (request, response) => {
  response.json(todos);
});

app.get('/todo/:id', (request, response) => {
  const { id } = request.params;

  const todo = getKeyByValue(todos, 'id', Number(id));
  if (todo) {
    response.json(todo);
  } else {
    response.status(404).send();
  }
});

app.listen(port, () => {
  console.log(`Express listening on port ${port}!`);
});

