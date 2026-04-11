const EligibilityRoute = require("express").Router();
const { AuthChecker } = require("../middlewares/authMiddleware");
const { authorizedRoles } = require("../middlewares/authorizedRoles");
const {
  EligibilityChecker,
  RMConnectController,
} = require("../controllers/eligibility.controller");

// Define eligibility routes here (if any)
EligibilityRoute.post(
  "/check-eligibility",
  AuthChecker,
  authorizedRoles("INVESTOR"),
  EligibilityChecker,
);
EligibilityRoute.post(
  "/rmconnect",
  AuthChecker,
  authorizedRoles("INVESTOR"),
  RMConnectController,
);

// export default EligibilityRoute;
module.exports = EligibilityRoute;
