require('dotenv').config();
const jwt = require('jsonwebtoken');

// Function to generate a Access token
const accessTokenGenerator = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
}

// Function to generate a Refresh Token
const refreshTokenGenerator = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }); // Refresh token valid for 7 days
}

// Function to verify a token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}

const generatePassword = () => {
    return Math.floor(100000 + Math.random() * 900000);
}

// export the functions
module.exports = {
    accessTokenGenerator,
    refreshTokenGenerator,
    verifyToken,
    generatePassword
}
