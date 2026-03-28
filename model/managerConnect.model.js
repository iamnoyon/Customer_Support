const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const rmAssingSchema = mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    business_id: {
        type: String,
        required: true,
    },
    manager_id: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("RMConnect", rmAssingSchema);