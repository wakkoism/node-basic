const express = require('express');
const bodyParser = require('body-parser');
const _ = require('underscore');
const db = require('../db.js');

const app = express();
const port = process.env.PORT || 3000;
let todoNextId = 1;

// Assuming that the last item of the array has the highest id.
const getTodoNextId = () => {
  //todoNextId = Number(todos[todos.length - 1].id) + 1;
};

const getTodoById = (request) => {
  const { id } = request.params;
  return _.findWhere(todos, { id: Number(id) });
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
  const queryParams = request.query;
  let filterTodos = todos;

  if (Object.hasOwnProperty.call(queryParams, 'completed')) {
    if (queryParams.completed === 'true') {
      filterTodos = _.where(todos, { completed: true });
    } else if (queryParams.completed === 'false') {
      filterTodos = _.where(todos, { completed: false });
    }
  }
  if (Object.hasOwnProperty.call(queryParams, 'q')) {
    const description = queryParams.q.trim();
    if (description !== '') {
      filterTodos = _.filter(filterTodos, (todo => todo.description
        .toLowerCase()
        .indexOf(description.toLowerCase()) !== -1));
    }
  }
  response.json(filterTodos);
});
// Get todos by ID.
app.get('/todo/:id', (request, response) => {
  const todo = getTodoById(request);
  if (todo) {
    response.json(todo);
  } else {
    response.status(404).send();
  }
});
// POST request /todos
app.post('/todos', (request, response) => {
  const { body } = request;
  db.todo.create({
    description: body.description,
    completed: body.completed,
  }).then((todo) => {
    response.json(todo.toJSON());
  }, (e) => {
    console.log(e);
    response.status(400).json(e);
  });
});
// Delete todos
app.delete('/todo/:id', (request, response) => {
  const todo = getTodoById(request);

  if (todo) {
    response.status(200).json(todo);
    todos = _.without(todos, todo);
  } else {
    response.status(404).json({ error: 'No todo id found' });
  }
});

app.put('/todo/:id', (request, response) => {
  const todo = getTodoById(request);
  if (todo) {
    let { body } = request;
    const hasDescription = Object.prototype.hasOwnProperty.call(body, 'description');
    const hasCompleted = Object.prototype.hasOwnProperty.call(body, 'completed');

    if ((hasDescription && (!_.isString(body.description) || body.description.trim() === ''))
        || (hasCompleted && !_.isBoolean(body.completed)
        )) {
      return response.status(400).send();
    }
    const { id } = request.params;
    if (hasDescription) {
      body.description = body.description.trim();
    }
    body.id = Number(id);
    // Add to todos item
    // Increment by 1;
    body = _.pick(body, 'description', 'completed', 'id');
    _.extend(todo, body);
    return response.json(body);
  }
  return response.status(404).json({ error: 'No todo id found' });
});

db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Express listening on port ${port}!`);
    });
  });
