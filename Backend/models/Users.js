const mongoose = require("mongoose");
const bcrypt   = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: false,
    default: Date.now,
  },
  sessions : [
    {
      sessionId : {
        type: String,
        required: true,
      },
      sessionStartTime : {
        type: Date,
        required: true
      },
      sessionEndTime : {
        type : Date,
        required: true,
      },
      experiments : [
        {
          experimentsId : {
            type: String,
            required: true,
          },
        }
      ]
    }
  ]
});

// generating a hash
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};


module.exports = User = mongoose.model("Users", UserSchema);


// HAve to put constraints on email/names etc