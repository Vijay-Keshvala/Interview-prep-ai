const User = require("../models/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Generate JWT token //

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

// @desc register new user
// @route POST /api/auth/register
// @access Public

const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl } = req.body
        // Check if user already exist
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ msg: "User already exist" })
        }

        // Hashed password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create new user 
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl
        })

        // Return user data with JWT
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id)
        })


    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

// @desc login  user
// @route POST /api/auth/login
// @access Public

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(500).json({ message: "Invalid email or password" })
        }

        //Comapare password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(500).json({ message: "Invalid email or password" })
        }

        // Return user data with JWT
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })

    }
}

// @desc Get user profile
// @route POST /api/auth/profile
// @access Private (requires/JWT)

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        if (!user) {
            return res.status(500).json({ message: "User not found" })
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const user = req.user; // from protect middleware
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        user.name = name;
        await user.save();

        res.json({
            message: "Profile updated successfully",
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile }