const express = require("express");
const router = express.Router();
const {
    body
} = require("express-validator");
const {
    registerCaptain,
    loginCaptain,
    captainProfile,
    logoutCaptain
} = require("../controllers/captainController");
const {
    captainAuthMiddleware
} = require("../middlewares/captainAuthMiddleware");

router.post("/register", [
    body("fullName.firstName").notEmpty().withMessage("First name is required"),
    body("fullName.lastName").notEmpty().withMessage("Last name is required"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").isLength({
        min: 6
    }).withMessage("Password must be at least 6 characters long"),
    body("vehicle.color").notEmpty().withMessage("Vehicle color is required"),
    body("vehicle.plate").notEmpty().withMessage("Vehicle plate is required"),
    body("vehicle.capacity").isInt({
        min: 1
    }).withMessage("Vehicle capacity must be at least 1"),
    body("vehicle.vehicleType").isIn(["car", "motorcycle", "truck"]).withMessage("Invalid vehicle type"),
    body("vehicle.location.latitude").isFloat().withMessage("Vehicle latitude is required"),
    body("vehicle.location.longitude").isFloat().withMessage("Vehicle longitude is required")
], registerCaptain);
router.post("/login", [body("email").isEmail().normalizeEmail().withMessage("Please enter a valid email address"),
    body("password").isLength({
        min: 6
    }).withMessage("Password must be at least 6 characters long")
], loginCaptain);

router.get("/profile", captainAuthMiddleware, captainProfile);
router.get("/logout", captainAuthMiddleware, logoutCaptain);

module.exports = router;