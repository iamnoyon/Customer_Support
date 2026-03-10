const {body} = require('express-validator');

// Middleware function to validate user registration input
const adminUserCreateValidation = [
     // Validate name
    body('name')
    .isLength({ max: 100 })
    .withMessage('Name must be less than 100 characters long')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long')
    .notEmpty()
    .withMessage('Name is required'),

    // Validate email
    body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .notEmpty()
    .withMessage('Email is required'),

    // Validate phone
    body('phone')
    .isMobilePhone('bn-BD') // You can specify the locale for phone number validation
    .withMessage('Valid phone number is required')
    .notEmpty()
    .withMessage('Phone number is required'),

    // Validate password
    body('password')
    .matches(/[!@#$%^&*]/)
    .withMessage('Password must contain at least one special character')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .notEmpty()
    .withMessage('Password is required'),

    // Validate role
    body('role')
    .isIn(['ADMIN', 'MANAGER', 'SUPERVISOR'])
    .withMessage('Role must be one of ADMIN, MANAGER, or SUPERVISOR')
    .notEmpty()
    .withMessage('Role is required')
]

// Export the validation middleware
module.exports = {
    adminUserCreateValidation
};