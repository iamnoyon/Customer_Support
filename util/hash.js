const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

// Function to hash a password
const hashPassword =  (password) => {
    try {
        return bcrypt.hashSync(password, salt);

    }catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

// Functin to compare a plain password with a hashed password
const comparePassword = (plainPassword, hashedPassword) => {
    try {
        return bcrypt.compareSync(plainPassword, hashedPassword);
    }catch (error) {
        console.error('Error comparing passwords:', error);
        throw error;
    }
}

module.exports = {
    hashPassword,
    comparePassword
}