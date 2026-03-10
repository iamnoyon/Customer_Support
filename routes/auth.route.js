const authRouter = require('express').Router();
const { handleValidationResults } = require('../validations/validationResult');
const {
    validationUserRegistration,
    validationUserLogin,
    validationForgotPassword
} = require('../validations/login_registration');
const {
    userRegistrationController,
    userLoginController,
    userForgotPasswordController
} = require('../controllers/auth.controller');

// Define the authentication routes
authRouter.post('/register', validationUserRegistration, handleValidationResults, userRegistrationController);
authRouter.post('/login', validationUserLogin, handleValidationResults, userLoginController);
authRouter.post('/forgot-password', validationForgotPassword, userForgotPasswordController)

// export the router
module.exports = {
    authRouter
};