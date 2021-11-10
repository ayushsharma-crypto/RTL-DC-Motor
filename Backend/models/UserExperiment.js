const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        experimentData: [
            {
              request: {
                voltage: {
                  type: Number,
                  required: true,
                },
              },
              response: {
                theoreticalRPM: {
                  type: Number,
                  default: null,
                },
                calculatedRPM: {
                  type: Number,
                  default: null,
                },
                powerConsumed: {
                  type: Number,
                  default: null,
                },
                latency: {
                 type: Date,
                  default: null,
                },
              },
            }
          ],
          description : String,
    }
);

module.exports = Userexperiment = mongoose.model("UserExperiment", UserSchema);

