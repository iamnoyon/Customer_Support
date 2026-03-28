const User = require("../model/user.model");
const SupervisorAssign = require("../model/supervisorAssign");

// Controller function to get all supervisors
const getRmList = async (req, res) => {
  const supervisorId = req.user.id; // Assuming the supervisor's ID is available in the request object
  try {
    const managers = await SupervisorAssign.find({
      supervisorId: supervisorId,
    }).populate("rmId");
    const rmList = managers.map((manager) => manager.rmId);
    const rmIds = rmList.flat();

    const rms = await User.find({
      id: { $in: rmIds },
    }); // Fetch RM details (name and email)
    res.status(200).json({
      success: true,
      message: "RM list retrieved successfully",
      data: rms.map((rm) => ({
        id: rm.id,
        name: rm.name,
        email: rm.email,
        phone: rm.phone,
        role: rm.role,
        profileImage: rm.profileImage,
        isActive: rm.isActive,
      })),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving RM list",
      error: error.message,
    });
  }
};

// export the controller functions
module.exports = {
  getRmList,
};
