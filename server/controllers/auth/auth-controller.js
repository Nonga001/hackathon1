const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

// Register
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        // Check if user already exists
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(400).json({
                success: false,
                message: "Email already in use. Use another email.",
            });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = new User({
            userName,
            email,
            password: hashPassword,
        });

        // Save new user to the database
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: "Registration successful.",
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            message: e.message || 'Some error occurred.',
        });
    }
};

// Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.status(400).json({
                success: false,
                message: "User does not exist. Please sign up first.",
            });
        }

        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
        if (!checkPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password!",
            });
        }

        const token = jwt.sign(
            {
                id: checkUser.id,
                role: checkUser.role,
                email: checkUser.email,
            },
            'CLIENT_SECRET_KEY',
            { expiresIn: "60m" } // Changed 'expiration' to 'expiresIn'
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Consider using true in production
        });

        return res.status(200).json({
            success: true,
            message: "Logged in successfully.",
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser.id,
            },
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            message: "Some error occurred.",
        });
    }
};

// Logout
// const logoutUser = (req, res) => {
//     res.clearCookie('token');
//     return res.status(200).json({
//         success: true,
//         message: "Logged out successfully.",
//     });
// };

// Exporting the functions
module.exports = { registerUser, loginUser,};
