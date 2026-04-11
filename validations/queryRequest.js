const {body} = require('express-validator');

const createQueryRequestValidation = [
    body('businessId')
    .optional(),

    body('title')
    .isLength({ max: 100 })
    .withMessage('Title must be less than 100 characters long')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters long')
    .notEmpty()
    .withMessage('Title is required'),

    body('type')
    .isIn(['General', 'Technical', 'Billing'])
    .withMessage('Type must be one of General, Technical, or Billing')
    .notEmpty()
    .withMessage('Type is required'),

    body('desc')
    .isLength({ max: 1000 })
    .withMessage('Description must be less than 1000 characters long')
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters long')
    .notEmpty()
    .withMessage('Description is required'),

]

module.exports = {
    createQueryRequestValidation
}