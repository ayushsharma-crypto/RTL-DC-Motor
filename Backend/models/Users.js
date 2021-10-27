const mongoose = require("mongoose");
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

module.exports = User = mongoose.model("Users", UserSchema);
