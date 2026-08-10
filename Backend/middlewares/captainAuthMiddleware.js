const captain = require("../models/captain");
const jwt = require("jsonwebtoken");
const blackListToken = require("../models/blackListToken");

const captainAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Authorization token missing or malformed"
            });
        }
        const isBlacklisted = await blackListToken.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({
                message: "Unauthorized: Token has been invalidated"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const existingCaptain = await captain.findById(decoded.userId);
        if (!existingCaptain) {
            return res.status(401).json({
                message: "Unauthorized: Captain not found"
            });
        }
        req.captain = existingCaptain;
        return next();
    } catch (error) {
        console.error("Error in captainAuthMiddleware:", error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: "Unauthorized: Invalid token"
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Unauthorized: Token expired"
            });
        }
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = {
    captainAuthMiddleware
};