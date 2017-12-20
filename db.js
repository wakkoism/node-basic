const Sequelize = require('sequelize');
const path = require('path');

const sequelize = new Sequelize(undefined, undefined, undefined, {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'data', 'dev-todo-api.sqlite'),
});

const db = {};

db.todo = sequelize.import(path.join(__dirname, 'models', 'todo.js'));
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
