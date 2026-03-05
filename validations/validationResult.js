const { validationResult } = require('express-validator');

// Middleware function to handle validation results
const handleValidationResults = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors = {};

        errors.array().forEach(error => {
            formattedErrors[error.path] = error.msg;
        });

        return res.status(400).json({
            success: false,
            message: 'Validation errors',
            errors: formattedErrors
        });
    }

    next();
};  

module.exports = {
    handleValidationResults
}