const user = require("../models/user");
const createUser = require("../services/userServices").createUser;
const { validationResult } = require("express-validator");

const registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: errors.array()
            });
        }

        const { email, password, fullName } = req.body;
        const safeFirstName = fullName?.firstName;
        const safeLastName = fullName?.lastName || "";

        if (!safeFirstName || !email || !password) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        const hashedPassword = await user.hashedPassword(password);
        const newUser = await createUser({
            fullName: {
                firstName: safeFirstName,
                lastName: safeLastName
            },
            email,
            password: hashedPassword
        });

        const token = newUser.generateToken();
        res.status(201).json({
            message: "User registered successfully",
            user: newUser,
            token
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

const loginUser = async (req, res, next) => {
    try {   
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "Email and password are required"
            });
        }
        const existingUser = await user.findOne({ email }).select("+password");
        if (!existingUser) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        const isPasswordValid = await existingUser.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({   
                message: "Invalid email or password"
            });
        }  
        const token = existingUser.generateToken();
        res.status(200).json({
            message: "Login successful",
            user: existingUser,
            token
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};






module.exports = {registerUser, loginUser}