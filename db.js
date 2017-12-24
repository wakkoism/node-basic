const Sequelize = require('sequelize');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

let sequelize = null;

if (env === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
  });
} else {
  sequelize = new Sequelize(undefined, undefined, undefined, {
    dialect: 'sqlite',
    storage: path.join(__dirname, 'data', 'dev-todo-api.sqlite'),
  });
}

const db = {};

db.todo = sequelize.import(path.join(__dirname, 'models', 'todo.js'));
db.user = sequelize.import(path.join(__dirname, 'models', 'user.js'));

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
