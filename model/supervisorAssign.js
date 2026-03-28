const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Define the Supervisor Assignment schema
const supervisorAssignSchema = mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    supervisorId: {
        type: String,
        required: true
    },
    rmId: {
        type: Array,
        required: true
    },
    assignedBy: {
        type: String,
        required: true
    },
    assignedAt: {
        type: Date,
        default: Date.now
    },
});

const SupervisorAssign = mongoose.model('SupervisorAssign', supervisorAssignSchema);

module.exports = SupervisorAssign;