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


;