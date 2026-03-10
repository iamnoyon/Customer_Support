const {body} = require('express-validator');

const updateProfileValidation = [
    // Validate name
    body('name')
    .isLength({ max: 100 })
    .withMessage('Name must be less than 100 characters long')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long')
    .notEmpty()
    .withMessage('Name is required'),

    // Validate phone
    body('phone')
    .isMobilePhone('bn-BD') // You can specify the locale for phone number validation
    .withMessage('Valid phone number is required')
    .notEmpty()
    .withMessage('Phone number is required'),

    // Validate email
    body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .notEmpty()
    .withMessage('Email is required'),
]

const UpdatePasswordValidation = [
    body('oldPassword')
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
    .withMessage('Current password is required'),

    body('newPassword')
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
    .withMessage('New password is required')
]

// Export the validation functions
module.exports = {
    updateProfileValidation,
    UpdatePasswordValidation
};