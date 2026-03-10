const {body, ExpressValidator} = require('express-validator');

// Middleware function to validate user registration input
const validationUserRegistration = [
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
    .withMessage('Password is required')
]

const validationUserLogin = [
    // Validate email or phone
    body('emailOrPhone')
  .notEmpty()
  .withMessage('Email or phone number is required')
  .custom((value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^01[3-9]\d{8}$/; // Bangladesh phone

      if (!emailRegex.test(value) && !phoneRegex.test(value)) {
          throw new Error('Enter a valid email or Bangladesh phone number');
      }

      return true;
  }),

    // Validate password
    body('password')
    .notEmpty()
    .withMessage('Password is required')
]

// forgot password validation
const validationForgotPassword = [
    // Validate email
    body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .notEmpty()
    .withMessage('Email is required'),
]


// export the validation middleware
module.exports = {
    validationUserRegistration,
    validationUserLogin,
    validationForgotPassword
}