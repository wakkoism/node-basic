const express = require('express');
const bodyParser = require('body-parser');
const _ = require('underscore');
const db = require('../db.js');

const app = express();
const port = process.env.PORT || 3000;

// Initialized middleware.
app.use(bodyParser.json());
// When loading just the index page.
app.get('/', (request, response) => {
  response.send('Todo API Root');
});
// Get all the todos object.
app.get('/todos', (request, response) => {
  const { query } = request;
  const where = {};

  if (Object.hasOwnProperty.call(query, 'completed')) {
    if (query.completed === 'true') {
      where.completed = true;
    } else if (query.completed === 'false') {
      where.completed = false;
    }
  }
  if (Object.hasOwnProperty.call(query, 'q')) {
    const description = query.q.trim();
    if (description.length > 0) {
      where.description = {
        $like: `%${description}%`,
      };
    }
  }
  db.todo
    .findAll({ where })
    .then((todos) => {
      if (!_.isEmpty(todos)) {
        response.json(todos);
      } else {
        response.status(404).send();
      }
    }, (e) => {
      response.status(500).send(e);
    });
});
// Get todos by ID.
app.get('/todo/:id', (request, response) => {
  const { id } = request.params;
  db.todo
    .findById(parseInt(id, 10))
    .then((todo) => {
      // Can return an empty object.
      if (!_.isEmpty(todo)) {
        response.json(todo.toJSON());
      } else {
        response.status(404).send();
      }
    }, (e) => {
      response.status(500).send(e);
    });
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
    response.status(400).json(e);
  });
});
// Delete todos
app.delete('/todo/:id', (request, response) => {
  const { id } = request.params;
  if (parseInt(id, 10) > 0) {
    db.todo
      .destroy({
        where: { id },
      })
      .then((todo) => {
        if (todo > 0) {
          response.status(200).send();
        } else {
          response.status(404).send({ error: 'ID not found' });
        }
      }, (e) => {
        response.status(400).json(e);
      });
  } else {
    response.status(400).json({ error: 'ID must be in integer.' });
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
