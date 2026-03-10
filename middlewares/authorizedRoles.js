const authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden: You do not have the required role to access this resource'
            });
        }
        next();
    };
};


module.exports = {
    authorizedRoles
}