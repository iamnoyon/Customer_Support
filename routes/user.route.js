const multer = require("multer");
const { fileStorage } = require("../util/FileUpload");
const upload = multer({ storage: fileStorage });

const userRouter = require("express").Router();
const { AuthChecker } = require("../middlewares/authMiddleware");
const { handleValidationResults } = require("../validations/validationResult");
const {
  updatePasswordController,
  getUserProfileController,
  updateProfileController,
} = require("../controllers/user.controller");
const {
  updateProfileValidation,
  UpdatePasswordValidation,
} = require("../validations/userValidations");

// Create a new user
userRouter.post(
  "/update-password",
  AuthChecker,
  UpdatePasswordValidation,
  handleValidationResults,
  updatePasswordController,
); // You can create a separate controller for refreshing tokens if needed
userRouter.get("/edit-profile", AuthChecker, getUserProfileController);
userRouter.put(
  "/update-profile",
  AuthChecker,
  upload.single("profileImage"), // multer must parse the multipart request before validators access req.body
  updateProfileValidation,
  handleValidationResults,
  updateProfileController,
);

// export the router
module.exports = userRouter;
