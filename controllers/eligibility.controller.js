const Sector = require("../model/sector.model");
const Business = require("../model/business.model");
const User = require("../model/user.model");
const Counter = require("../model/roundRobin.model");
const RMConnect = require("../model/managerConnect.model");

const EligibilityChecker = async (req, res) => {
  const { business_id } = req.body;

  try {
    const business = await Business.findOne({ id: business_id });
    const sector = await Sector.findOne({ id: business.investment_sector });
    const investmentValueEligible =
      business.investment_amount >= sector.minIvstment;

    if (!sector) {
      return res.status(404).json({
        success: false,
        message: "This sector is currently not suitable for RM engagement",
        data: {
          sectorEligible: false,
          investmentEligible: false,
        },
      });
    }
    if (sector && investmentValueEligible) {
      return res.status(200).json({
        success: true,
        message: "Eligibility check completed successfully",
        data: {
          sectorEligible: true,
          investmentEligible: true,
        },
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Eligibility check completed successfully",
        data: {
          sectorEligible: true,
          investmentEligible: false,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const RMConnectController = async (req, res) => {
  const { business_id } = req.body;
  try {
    const managers = await User.find({
      $and: [{ role: "MANAGER" }, { isActive: true }],
    });
    const business = await Business.findOne({ id: business_id });
    const sector = await Sector.findOne({ id: business.investment_sector });
    const investmentValueEligible =
      business.investment_amount >= sector.minIvstment;

    if (managers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No Manager Available",
      });
    }

    const hasAlreadyRM = await RMConnect.findOne({ business_id: business.id });
    if (hasAlreadyRM) {
        return res.status(400).json({
            success: false,
            message: "This business already has an assigned RM",
            data: {
                assignedManager: true
            }
        })
    }

    if (business && sector && investmentValueEligible) {
      // 🔒 Atomic increment (fix concurrency issue)
      const counter = await Counter.findOneAndUpdate(
        { key: "rm_counter" },
        { $inc: { value: 1 } },
        { new: true, upsert: true },
      );

      const index = counter.value % managers.length;
      const assignedManager = managers[index];

      // Create RMConnect entry
      await RMConnect.create({
        business_id: business.id,
        manager_id: assignedManager.id,
      });

      return res.status(200).json({
        success: true,
        message: "RM connected successfully",
        data: {
          manager: {
            name: assignedManager.name,
            email: assignedManager.email,
            phone: assignedManager.phone,
          },
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "RM connection failed! Try again.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export default ;
module.exports = {
  EligibilityChecker,
  RMConnectController,
};
