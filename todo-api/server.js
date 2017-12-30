const express = require('express');
const bodyParser = require('body-parser');
const _ = require('underscore');
const db = require('../db.js');
const middleware = require('./middleware.js')(db);

const app = express();
const port = process.env.PORT || 3000;

// Initialized middleware.
app.use(bodyParser.json());
// When loading just the index page.
app.get('/', (request, response) => {
  response.send('Todo API Root');
});
// Get all the todos object.
app.get('/todos', middleware.requireAuthentication, (request, response) => {
  const { query } = request;
  const where = { userId: request.user.get('id') };

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
app.get('/todo/:id', middleware.requireAuthentication, (request, response) => {
  const { id } = request.params;
  db.todo
    .findOne({
      where: {
        id: parseInt(id, 10),
        userId: request.user.get('id'),
      },
    })
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
app.post('/todos', middleware.requireAuthentication, (request, response) => {
  const { body } = request;
  db.todo.create({
    description: body.description,
    completed: body.completed,
  }).then((todo) => {
    request.user
      .addTodo(todo)
      .then(() => todo.reload())
      .then((reloadedTodo) => {
        response.json(reloadedTodo.toJSON());
      });
  }, (e) => {
    response.status(400).json(e);
  });
});
// Delete todos
app.delete('/todo/:id', middleware.requireAuthentication, (request, response) => {
  const { id } = request.params;
  if (parseInt(id, 10) > 0) {
    db.todo
      .destroy({
        where: {
          id,
          userId: request.user.get('id'),
        },
      })
      .then((todo) => {
        if (todo > 0) {
          response.status(204).send();
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

app.put('/todo/:id', middleware.requireAuthentication, (request, response) => {
  const { id } = request.params;
  const fields = {};
  if (parseInt(id, 10) > 0) {
    const { body } = request;
    const hasDescription = Object.prototype.hasOwnProperty.call(body, 'description');
    const hasCompleted = Object.prototype.hasOwnProperty.call(body, 'completed');

    if (hasDescription) {
      fields.description = body.description;
    }
    if (hasCompleted) {
      fields.completed = body.completed;
    }
    db.todo
      .update(fields, {
        where: {
          id,
          userId: request.user.get('id'),
        },
      })
      .spread((affectedCount) => {
        if (affectedCount) {
          response.status(200).send();
        } else {
          response.status(404).send();
        }
      }, (e) => {
        response.status(400).json(e);
      });
  } else {
    response.status(400).json({ error: 'ID must be in integer.' });
  }
});

// POST request /users
app.post('/users', (request, response) => {
  const body = _.pick(request.body, 'email', 'password');
  db.user
    .create(body)
    .then((user) => {
      response.json(user.toPublicJSON());
    }, (e) => {
      response.status(400).json(e);
    });
});

// POST request /users/login
app.post('/users/login', (request, response) => {
  const body = _.pick(request.body, 'email', 'password');
  db.user
    .authenticate(body)
    .then((user) => {
      const token = user.generateToken('authentication');
      if (token) {
        response.header('Auth', token).json(user.toPublicJSON());
      } else {
        response.status(401).send();
      }
    }, () => {
      response.status(401).send();
    });
});

db.sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Express listening on port ${port}!`);
    });
  });
