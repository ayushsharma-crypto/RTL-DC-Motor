const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ExperimentSchema = new Schema({
        userID: {
            type: String,
            required: true
        },
        request: {
            voltage: {
                type: Number,
                required: true
            },
        },
        response: {
            theoreticalRPM: {
                type: Number,
                default: null
            },
            calculatedRPM: {
                type: Number,
                default: null
            },
            powerConsumed: {
                type: Number,
                default: null
            },
        },
    },
    {
        timestamps: true 
        // createdAt - req. timestamp
        // updatedAt - res. timestamp
    }
);

module.exports = Experiment = mongoose.model("Experiments", ExperimentSchema);
