const bcrypt = require('bcrypt');
const _ = require('underscore');
const cryptojs = require('crypto-js');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => sequelize.define('user', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.VIRTUAL,
    allowNull: false,
    validate: {
      len: [7, 100],
    },
    // Can't use arrow function here because using this.
    set(value) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(value, salt);

      this.setDataValue('password', value);
      this.setDataValue('salt', salt);
      this.setDataValue('password_hash', hashedPassword);
    },
  },
  salt: {
    type: DataTypes.STRING,
  },
  password_hash: {
    type: DataTypes.STRING,
  },
}, {
  hooks: {
    beforeValidate: (user) => {
      if (typeof user.email === 'string') {
        // Make all the email lowercase so that the email can't be duplicated
        // if user upper or lowercase.
        user.email = user.email.toLowerCase();
      }
    },
  },
  classMethods: {
    authenticate(body) {
      return new Promise((resolve, reject) => {
        if (typeof body.email === 'string' && body.email.trim().length > 0 && typeof body.password === 'string' && body.password.length > 0) {
          this
            .findOne({
              where: { email: body.email },
            })
            .then((user) => {
              if (!user || !bcrypt.compareSync(body.password, user.get('password_hash'))) {
                return reject();
              }
              return resolve(user);
            }, () => reject());
        } else {
          reject();
        }
      });
    },
  },
  instanceMethods: {
    toPublicJSON() {
      const json = this.toJSON();
      return _.pick(json, 'id', 'email', 'updatedAt', 'createdAt');
    },
    generateToken(type) {
      if (typeof type !== 'string') {
        return undefined;
      }

      try {
        const stringData = JSON.stringify({
          type,
          id: this.get('id'),
        });
        const encryptData = cryptojs.AES.encrypt(stringData, 'abc123!@#!').toString();
        const token = jwt.sign({ token: encryptData }, 'qwerty098');
        return token;
      } catch (e) {
        return undefined;
      }
    },
  },
});
