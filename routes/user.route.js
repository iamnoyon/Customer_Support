const userRouter = require('express').Router();
const {AuthChecker} = require('../middlewares/authMiddleware')
const {
    userRegistrationController,
    userLoginController,
    updatePasswordController
} = require('../controllers/user.controller');
const {
    validationUserRegistration,
    validationUserLogin,
    UpdatePasswordValidation
} = require('../validations/login_registration');
const { handleValidationResults } = require('../validations/validationResult');


// Create a new user
userRouter.post('/register', validationUserRegistration, handleValidationResults, userRegistrationController);
userRouter.post('/login', validationUserLogin, handleValidationResults, userLoginController);
userRouter.post('/update-password', AuthChecker, UpdatePasswordValidation, handleValidationResults, updatePasswordController); // You can create a separate controller for refreshing tokens if needed

// export the router
module.exports = userRouter;