const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        email: {
          type: String,
          required: true,
        },
        sessionDate : {
          type: Number,
          required: true,
        },
        sessionStartTime : {
          type: Number,
          required: true
        },
        sessionEndTime : {
          type : Number,
          required: true,
        },
        experiments : [String],
    }
);

// 0 - 1 => 1
// 1 - 2 => 2
// 2 - 3 => 3
module.exports = Usersessions = mongoose.model("UserSessions", UserSchema);

