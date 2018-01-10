module.exports = (sequelize, DataTypes) => sequelize.define('todo', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 255],
    },
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  instanceMethods: {
    toPublicJSON() {
      const json = this.toJSON();
      // Check the date has pass
      if (json.dueDate < new Date()) {
        json.message = 'The due date has pass!';
      }
      return json;
    },
  },
});
