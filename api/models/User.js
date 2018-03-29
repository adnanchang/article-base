/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

var bcrypt = require("bcrypt");

module.exports = {
  attributes: {
    email: {
      type: "email",
      required: true,
      unique: true
    },
    password: {
      type: "string",
      protected: true,
      required: true,
      columnName: "encryptedPassword"
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
    }
  },

  beforeCreate: function(values, cb) {
    bcrypt.hash(values.password, 10, function(err, hash) {
      if (err) return cb(err);
      values.password = hash;
      cb();
    });
  },

  comparePassword: function(password, user) {
    return new Promise(function(resolve, reject) {
      bcrypt.compare(password, user.password, function(err, match) {
        if (err) reject(err);

        if (match) {
          resolve(true);
        } else {
          reject(err);
        }
      });
    });
  },

  connection: 'mongoDB'
};
