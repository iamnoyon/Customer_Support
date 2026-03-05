const userRouter = require('express').Router();
const {
    userRegistrationController,
    userLoginController
} = require('../controllers/user.controller');
const {
    validationUserRegistration,
    validationUserLogin
} = require('../validations/login_registration');
const { handleValidationResults } = require('../validations/validationResult');


// Create a new user
userRouter.post('/register', validationUserRegistration, handleValidationResults, userRegistrationController);
userRouter.post('/login', validationUserLogin, handleValidationResults, userLoginController);

// export the router
module.exports = userRouter;