const Business = require("../model/business.model");

const createNewBusiness = async (req, res) => {
  const { business_name, investment_sector, investment_amount } = req.body;
  const userId = req.user.id; // Assuming the user ID is stored in req.user after authentication

  try {
    const findExistingBusiness = await Business.findOne({
      $and: [{ business_name: business_name }, { createdBy: userId }],
    });
    if (findExistingBusiness) {
      return res.status(400).json({
        success: false,
        message: "Business with the same name already exists for this user",
      });
    }
    const newBusiness = new Business({
      business_name: business_name,
      investment_sector: investment_sector,
      investment_amount: investment_amount,
      createdBy: userId,
      updatedBy: userId,
    });
    await newBusiness.save();
    return res.status(201).json({
      success: true,
      message: "Business created successfully",
      data: newBusiness,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error checking for existing business",
      error: error.message,
    });
  }
};

// Controller function to get business by user ID
const getBusinessByUserId = async (req, res) => {
  const userId = req.user.id; // Assuming the user ID is stored in req.user after authentication

  try {
    const businesses = await Business.find({ createdBy: userId });
    const filterBusinessData = businesses.map((business) => ({
      id: business.id,
      business_name: business.business_name,
    }));
    return res.status(200).json({
      success: true,
      message: "Businesses retrieved successfully",
      data: filterBusinessData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving businesses",
      error: error.message,
    });
  }
};

// export the controller functions
module.exports = {
  createNewBusiness,
  getBusinessByUserId,
};
