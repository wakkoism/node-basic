const express = require('express');
const bodyParser = require('body-parser');
const _ = require('underscore');

const app = express();
const port = process.env.PORT || 3000;
let todoNextId = 1;

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

// Assuming that the last item of the array has the highest id.
const getTodoNextId = () => {
  todoNextId = Number(todos[todos.length - 1].id) + 1;
};
// Initialized to get the last number
getTodoNextId();
// Initialized middleware.
app.use(bodyParser.json());
// When loading just the index page.
app.get('/', (request, response) => {
  response.send('Todo API Root');
});
// Get all the todos object.
app.get('/todos', (request, response) => {
  response.json(todos);
});
// Get todos by ID.
app.get('/todo/:id', (request, response) => {
  const { id } = request.params;

  const todo = _.findWhere(todos, { id: Number(id) });
  if (todo) {
    response.json(todo);
  } else {
    response.status(404).send();
  }
});
// POST request /todos
app.post('/todos', (request, response) => {
  const { body } = request;
  if (!_.isString(body.description)
      || !_.isBoolean(body.completed)
      || body.description.trim() === '') {
    return response.status(400).send();
  }
  body.description = body.description.trim();
  // Add to todos item
  body.id = todoNextId;
  // Increment by 1;
  todoNextId += 1;
  todos.push(_.pick(body, 'description', 'completed', 'id'));
  return response.json(todos);
});

app.listen(port, () => {
  console.log(`Express listening on port ${port}!`);
});

