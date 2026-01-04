const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Export the model
module.exports = mongoose.model("Submission", submissionSchema);