const mongoose = require('mongoose');

// Define a sample schema for a User model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = {
    User
};