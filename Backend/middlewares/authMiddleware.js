const user = require("../models/user");
const jwt = require("jsonwebtoken");
const blackListToken = require("../models/blackListToken");
const authMiddleware = async (req, res, next) => {
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
        const existingUser = await user.findById(decoded._id);
        if (!existingUser) {
            return res.status(401).json({
                message: "Unauthorized: User not found"
            });
        }
        req.user = existingUser;
        return next();
    } catch (error) {
        console.error("Error in authMiddleware:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = {
    authMiddleware
};