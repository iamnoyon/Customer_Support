// Importing necessary modules and middlewares
const QueryRequest = require("../model/queryRequest.model")
const Business = require("../model/business.model");


const createQueryRequest = async (req, res) => {
    const { businessId, title, type, desc, attachments } = req.body;
    const createdBy = req.user.id; // Assuming the user ID is available in the request object
    try {
        if(!businessId){
            return res.status(400).json({ message: "Business ID is required" });
        }
        const business = await Business.findOne({id: businessId});
        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }
        console.log(business);
    } catch (error) {
        
    }
}

module.exports = {
    createQueryRequest
}