const adminRouter = require('express').Router();
const {AuthChecker} = require('../middlewares/authMiddleware');
const {handleValidationResults} = require('../validations/validationResult');
const {adminUserCreateValidation, sectorAddValidation} = require('../validations/adminUserCreate');
const {authorizedRoles} = require('../middlewares/authorizedRoles')
const {
    getAllUsers,
    createUser,
    deleteUser,
    getAllSupervisors,
    addBusinessSector
} = require('../controllers/admin.controller');


// all admin routes will be defined here
adminRouter.get('/get-all-users', AuthChecker, authorizedRoles('ADMIN'), getAllUsers);
adminRouter.post('/create-user', AuthChecker, authorizedRoles('ADMIN'), adminUserCreateValidation, handleValidationResults, createUser);
adminRouter.delete('/delete-user/:id', AuthChecker, authorizedRoles('ADMIN'), deleteUser);

// supervisor assignment routes
adminRouter.get('/get-all-supervisor', AuthChecker, authorizedRoles('ADMIN'), getAllSupervisors);

// business critaria routes can be added here
adminRouter.post('/add-sector', AuthChecker, authorizedRoles('ADMIN'), sectorAddValidation, handleValidationResults, addBusinessSector)


// export default adminRouter;
module.exports = adminRouter;