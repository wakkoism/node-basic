const Sequelize = require('sequelize');
const path = require('path');

const sequelize = new Sequelize(undefined, undefined, undefined, {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'basic-sqlite-database.sqlite'),
});

const Todo = sequelize.define('todo', {
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 255],
    },
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

sequelize.sync()
  .then(() => {
    console.log('Everything is synced');
    return Todo.create({
      description: 'Take out the trash',
      completed: false,
    });
  })
  .then(() => Todo.create({
    description: 'More stuff needs to be done.',
    created: true,
  }))
  .then(() => Todo.findAll({
    where: {
      completed: false,
      description: {
        $like: '%trash%',
      },
    },
  }))
  .then((todos) => {
    if (todos) {
      todos.forEach((todo) => {
        console.log(todo.toJSON());
      });
    } else {
      console.log('No todo found');
    }
  })
  .catch((e) => {
    console.log(e);
  });
