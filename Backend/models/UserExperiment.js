const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const UserSchema = new Schema(
   {
       experimentData: [
         {
            voltage: {
              type: String,
              required: true,
            }
          },
          {
            calculatedRPM: {
              type: String,
              default: null,
            }
          },
          {
            averageCurrent : {
              type : String,
              default : null,
            }
          }
         ],
         description : String,
   }
);
 
module.exports = Userexperiment = mongoose.model("UserExperiment", UserSchema);
