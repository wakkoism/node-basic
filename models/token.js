const cryptojs = require('crypto-js');

module.exports = (sequelize, DataTypes) => sequelize.define('token', {
  token: {
    type: DataTypes.VIRTUAL,
    allowNull: false,
    validate: {
      len: [1],
    },
    set(value) {
      const hash = cryptojs.MD5(value).toString();
      this.setDataValue('token', value);
      this.setDataValue('tokenHash', hash);
    },
  },
  tokenHash: DataTypes.STRING,
});
