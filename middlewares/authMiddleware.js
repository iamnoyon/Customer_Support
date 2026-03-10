const { verifyToken } = require("../util/auth");

// Middleware to check if the user is authenticated
const AuthChecker = (req, res, next) => {
  const authHeader = req.headers["authorization"]?.split(" ")[1];
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  const decoded = verifyToken(authHeader);
  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  req.user = decoded; // Attach the decoded user information to the request object

  next();
};


module.exports = {
  AuthChecker,
};
