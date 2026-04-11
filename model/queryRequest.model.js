const mongoose = require('mongoose');

const queryRequestSchema = new mongoose.Schema({
    businessId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    attachments: {
        type: [String],
        required: false
    },
    slaTime: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        required: true,
        enum: ['Open', 'Pending', 'Closed'],
        default: 'Pending'
    },
    createdBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: String,
        required: false
    },
    updatedAt: {
        type: Date,
        required: false
    },
    closedBy: {
        type: String,
        required: false
    },
    closedAt: {
        type: Date,
        required: false
    },
});

const QueryRequest = mongoose.model('QueryRequest', queryRequestSchema);

module.exports = QueryRequest;