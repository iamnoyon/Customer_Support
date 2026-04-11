const Sector = require("../model/sector.model");

// Controller function to get the list of sectors
const getSectorList = async (req, res) => {
  try {
    const sectors = await Sector.find();
    res.status(200).json({
      success: true,
      message: "Sectors retrieved successfully",
      data: sectors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving sectors",
      error: error.message,
    });
  }
};

// export the controller functions
module.exports = {
  getSectorList,
};
