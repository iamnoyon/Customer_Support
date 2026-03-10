const User = require('../model/user.model');
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
    const {name, email, phone, password, role} = req.body;
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


// export default
module.exports = {
    getAllUsers,
    createUser,
    deleteUser
}
