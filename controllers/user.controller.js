const User = require("../model/user.model");
const { hashPassword, comparePassword } = require("../util/hash");
const config = require("../config/config");

// Update password controller
const updatePasswordController = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    // Check if the old password is correct
    const isPasswordValid = comparePassword(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid old password",
      });
    }
    // Update the password
    user.password = hashPassword(newPassword);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating password",
      error: error.message,
    });
  }
};

// get user profile controller
const getUserProfileController = async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.user.email });
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: {
        id: findUser.id,
        name: findUser.name,
        email: findUser.email,
        phone: findUser.phone,
        role: findUser.role,
        isActive: findUser.isActive,
        profileImage: findUser.profileImage,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user profile",
      error: error.message,
    });
  }
};

// update user profile controller
const updateProfileController = async (req, res) => {
  const { name, phone, email } = req.body;
  try {
    const findUser = await User.findOne({ email: req.user.email });
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    findUser.name = name || findUser.name;
    findUser.phone = phone || findUser.phone;
    findUser.email = email || findUser.email;
    if (req.file) {
        const normalizedPath = req.file.path.replace(/\\/g, '/');
      findUser.profileImage = `${config.BASE_URL}/${normalizedPath}`;
    }

    await findUser.save();

    return res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: {
        id: findUser.id,
        name: findUser.name,
        email: findUser.email,
        phone: findUser.phone,
        role: findUser.role,
        isActive: findUser.isActive,
        profileImage: findUser.profileImage,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating user profile",
      error: error.message,
    });
  }
};

// Export the controller functions
module.exports = {
  updatePasswordController,
  getUserProfileController,
  updateProfileController,
};
