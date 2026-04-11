const RMConnected = require("../model/managerConnect.model");
const User = require("../model/user.model");

const getRMInfo = async (req, res) => {
  const businessId = req.params.businessId;
  try {
    const rmid = await RMConnected.findOne({ business_id: businessId }).select(
      "manager_id",
    );
    if (!rmid) {
      return res.status(404).json({
        success: false,
        message: "No RM connected to this business",
      });
    }
    const rmInfo = await User.findOne({ id: rmid.manager_id }).select(
      "id name email phone photo",
    );
    if (!rmInfo) {
      return res.status(404).json({
        success: false,
        message: "RM not found",
      });
    }
    res.status(200).json({
      success: true,
      data: rmInfo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getRMInfo,
};
