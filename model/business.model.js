const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const businessSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        default: uuidv4
    },
    business_name: {
        type: String,
        required: true
    },
    investment_sector: {
        type: String,
        required: true
    },
    investment_amount: {
        type: Number,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    updatedBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Business = mongoose.model('business', businessSchema);

module.exports = Business;