const supervisorRouter = require("express").Router();
const { AuthChecker } = require("../middlewares/authMiddleware");
const { authorizedRoles } = require("../middlewares/authorizedRoles");
const {
  getRmList,
  getRmDetails,
} = require("../controllers/supervisor.controller");

// Define routes for supervisor-related operations here
supervisorRouter.get(
  "/get-rm-list",
  AuthChecker,
  authorizedRoles("SUPERVISOR"),
  getRmList,
);
supervisorRouter.get(
  "/get-rm-details/:rmId",
  AuthChecker,
  authorizedRoles("SUPERVISOR"),
  getRmDetails,
);

// export default supervisorRouter;
module.exports = supervisorRouter;
