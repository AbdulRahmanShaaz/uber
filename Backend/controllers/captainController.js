const captainService = require('../services/captainServices');
const Captain = require('../models/captain');
const blackListToken = require('../models/blackListToken');
const { validationResult } = require('express-validator');

const registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicle } = req.body;

    try {
        const hashedPassword = await Captain.hashedPassword(password);
        const newCaptain = await captainService.captainServices({
            fullName,
            email,
            password: hashedPassword,
            vehicle
        });

        return res.status(201).json(newCaptain);
    } catch (error) {
        if (error?.code === 11000 || error?.name === 'MongoServerError') {
            return res.status(409).json({
                success: false,
                message: 'A captain with this email already exists.'
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong while registering the captain.'
        });
    }
};
const loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const existingCaptain = await Captain.findOne({ email }).select('+password');
        if (!existingCaptain) {
            return res.status(404).json({
                success: false,
                message: 'Captain not found.'
            });
        }

        const isPasswordValid = await existingCaptain.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password.'
            });
        }

        const token = existingCaptain.generateToken();
        res.cookie('token', token);

        const captainResponse = existingCaptain.toObject();
        delete captainResponse.password;

        return res.status(200).json({
            success: true,
            message: 'Login successful.',
            captain: captainResponse,
            token
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong while logging in the captain.'
        });
    }
};

const captainProfile = async (req, res, next) => {
    try {
        const captain = req.captain;
        if (!captain) {
            return res.status(404).json({
                success: false,
                message: 'Captain not found.'
            });
        }
        return res.status(200).json({
            success: true,
            captain 
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong while fetching captain profile.'
        });
    }
};

const logoutCaptain = async (req, res, next) => {
    try {
        res.clearCookie("token");
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (token) {
            await blackListToken.create({ token });
        }
        res.status(200).json({
            message: "Logout successful"
        });
    } catch (error) {
        console.error("Error logging out captain:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};





module.exports = {
    registerCaptain,
    loginCaptain,
    captainProfile,
    logoutCaptain
};