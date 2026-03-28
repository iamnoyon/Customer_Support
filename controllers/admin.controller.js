const User = require('../model/user.model');
const Sector = require('../model/sector.model');
const SupervisorAssign = require('../model/supervisorAssign');
const { v4: uuidv4 } = require('uuid');
const { hashPassword } = require('../util/hash');

// Controller function to get all users
const getAllUsers = async (req, res) => {
    const { role, search, status_active } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {

        const query = {};

        // Role filter
        if (role) {
            query.role = role;
        } else {
            query.role = { $in: ['INVESTOR', 'MANAGER', 'SUPERVISOR'] };
        }

        // Status filter
        if (status_active !== undefined) {
            query.isActive = status_active === "true";
        }

        // Search filter
        if (search) {
            query.$or = [
                { email: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } }
            ];
        }

        const users = await User.find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        const totalUsers = await User.countDocuments(query);

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            page,
            limit,
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            data: users
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching users",
            error: error.message
        });
    }
};

const createUser = async (req, res) => {
    const {name, email, phone, password, role, supervisorId} = req.body;
    try {
        const existingUser = await User.findOne({ $or: [{ email: email }, { phone: phone }] });
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: 'User with this email or phone already exists'
            });
        }
        const newUser = new User({
            id: uuidv4(),
            name: name,
            email: email,
            phone: phone,
            password: hashPassword(password),
            role: role,
            createdBy: req.user.email,
            updatedBy: req.user.email,
        });
        await newUser.save();
        
        // find supervisor by supervisorId and assign the new user to the supervisor
            if(supervisorId && role === 'MANAGER'){
                const isAlreadyAssigned = await SupervisorAssign.findOne({ supervisorId: supervisorId});
                if(isAlreadyAssigned){
                    isAlreadyAssigned.rmId.push(newUser.id);
                    await isAlreadyAssigned.save();
                }else{
                    const newAssignment = new SupervisorAssign({
                        supervisorId: supervisorId,
                        rmId: [newUser.id], 
                        assignedBy: req.user.email
                    });
                    await newAssignment.save();
                }                 
            }
        res.status(201).json({
            success: true,
            message: 'User created successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: error.message
        })
    }
}

const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findOne({id: userId});
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        await User.deleteOne({id: userId});
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting user',
            error: error.message
        });
    }
}


const getAllSupervisors = async (req, res) => {
    try {
        const supervisors = await User.find({ $and: [{ role: 'SUPERVISOR' }, { isActive: true }] });
        if(supervisors.length === 0){
            return res.status(404).json({
                success: false,
                message: 'No supervisors found'
            });
        }
        const supervisorData = supervisors.map(s => ({
            id: s.id,
            name: s.name,
        }));
        res.status(200).json({
            success: true,
            message: 'Supervisors fetched successfully',
            data: supervisorData
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching supervisors',
            error: error.message
        });
    }
}


const addBusinessSector = async (req, res) =>{
    const {sectorName, minimumInvestment, description} = req.body;
    try {
        const sector = await Sector.findOne({name: sectorName});
        if(sector){
            return res.status(400).json({
                success: false,
                message: 'Sector with this name already exists'
            });
        }
        const newSector = new Sector({
            name: sectorName,
            desc: description,
            minIvstment: minimumInvestment
        });
        await newSector.save();
        res.status(201).json({
            success: true,
            message: 'Business sector added successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding business sector',
            error: error.message
        });
    }

}


// export default
module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    getAllSupervisors,
    addBusinessSector
}
