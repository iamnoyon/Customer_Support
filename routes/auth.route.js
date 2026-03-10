const authRouter = require('express').Router();
const { handleValidationResults } = require('../validations/validationResult');
const {
    validationUserRegistration,
    validationUserLogin,
} = require('../validations/login_registration');
const {
    userRegistrationController,
    userLoginController,
} = require('../controllers/auth.controller');

// Define the authentication routes
authRouter.post('/register', validationUserRegistration, handleValidationResults, userRegistrationController);
authRouter.post('/login', validationUserLogin, handleValidationResults, userLoginController);

// export the router
module.exports = {
    authRouter
};