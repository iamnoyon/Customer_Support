const businessRouter = require("express").Router();
const { AuthChecker } = require("../middlewares/authMiddleware");
const { authorizedRoles } = require("../middlewares/authorizedRoles");
const {
  createNewBusiness,
  getBusinessByUserId,
} = require("../controllers/business.controller");

// Create a new business
businessRouter.post(
  "/create-business",
  AuthChecker,
  authorizedRoles("INVESTOR"),
  createNewBusiness,
);
businessRouter.get(
  "/businesses",
  AuthChecker,
  authorizedRoles("INVESTOR"),
  getBusinessByUserId,
);

// export the router
module.exports = businessRouter;
