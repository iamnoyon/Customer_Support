const mongoose = require('mongoose');

// Define the User schema
const userSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        maxLength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['ADMIN', 'INVESTOR', 'MANAGER', 'SUPERVISOR']
    },
    profileImage: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String,
    },
    updatedBy: {
        type: String,
    }
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;