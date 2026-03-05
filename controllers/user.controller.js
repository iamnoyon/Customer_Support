const User = require('../model/user.model');
const { v4: uuidv4 } = require('uuid');
const { hashPassword, comparePassword } = require('../util/hash');
const { accessTokenGenerator, refreshTokenGenerator } = require('../util/auth');

// Controller function to handle user signup
const userRegistrationController = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ email: email }, { phone: phone }] });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email or phone number',
            })
        }

        // Create a new user
        const newUser = new User({
            id: uuidv4(),
            name: name,
            email: email,
            phone: phone,
            password: hashPassword(password), // In a real application, make sure to hash the password before saving
            role: 'INVESTOR', // Default role
            createdBy: 'system', // You can replace this with the actual user ID if available
            updatedBy: 'system'  // You can replace this with the actual user ID if available
        })

        // Save the user to the database
        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                role: newUser.role,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error registering user',
            error: error.message
        })
    }
}


// your logincontroller 
const userLoginController = async (req, res) => {
    // Implement login logic here
    const { emailOrPhone, password } = req.body;
    try {
        const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
        if (!user){
            return res.status(400).json({
                success: false,
                message: 'User not found with this email or phone number',
            })
        }
        // Check if the password is correct
        const isPasswordValid = comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: 'Invalid password',
            })
        }

        // generate access token and refresh token
        const accessToken = accessTokenGenerator({ email: user.email, role: user.role });
        const refreshToken = refreshTokenGenerator({ email: user.email, role: user.role });

        res.cookie('refreshToken', refreshToken, { 
            httpOnly: true, 
            secure: true, 
            sameSite: 'Strict' 
        });

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                access_token: accessToken,
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error logging in user',
            error: error.message
        })
    }
}


// Update password controller
const updatePasswordController = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found',
            })
        }
        // Check if the old password is correct
        const isPasswordValid = comparePassword(oldPassword, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: 'Invalid old password',
            })
        }
        // Update the password
        user.password = hashPassword(newPassword);
        await user.save();
        
        return res.status(200).json({
            success: true,
            message: 'Password updated successfully',
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error updating password',
            error: error.message
        });
    }
}


// Export the controller functions
module.exports = {
    userRegistrationController,
    userLoginController,
    updatePasswordController
};