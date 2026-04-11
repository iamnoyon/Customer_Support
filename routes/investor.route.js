const InvestorRouter = require("express").Router();
const { AuthChecker } = require("../middlewares/authMiddleware");
const { authorizedRoles } = require("../middlewares/authorizedRoles");
const { getRMInfo } = require("../controllers/investor.controller");
const { createQueryRequest } = require("../controllers/queryRequest.controller");
const { createQueryRequestValidation } = require("../validations/queryRequest");

// all the routes will be here
InvestorRouter.get(
  "/rm-info/:businessId",
  AuthChecker,
  authorizedRoles("INVESTOR"),
  getRMInfo,
);

InvestorRouter.post(
  '/create-query-request',
  AuthChecker,
  authorizedRoles('INVESTOR'),
  createQueryRequestValidation,
  createQueryRequest
)

// exporting the router
module.exports = InvestorRouter;
