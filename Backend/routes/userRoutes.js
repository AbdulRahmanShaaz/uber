const express = require("express");
const { body } = require("express-validator");
const {registerUser,loginUser,getUserProfile,logoutUser} = require("../controllers/userController");
const { authMiddleware} = require("../middlewares/userAuthMiddleware");
const router = express.Router();

router.post("/register", [
    body("email").isEmail().normalizeEmail().withMessage("Please enter a valid email address"),
    body("firstName")
        .optional({ nullable: true })
        .isString()
        .isLength({ min: 3 })
        .withMessage("First name must be at least 3 characters long"),
    body("lastName")
        .optional({ nullable: true })
        .isString()
        .isLength({ min: 3 })
        .withMessage("Last name must be at least 3 characters long"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
], registerUser);

router.post("/login", [
    body("email").isEmail().normalizeEmail().withMessage("Please enter a valid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
],  loginUser);
router.get("/profile", authMiddleware, getUserProfile);
router.get("/logout", authMiddleware, logoutUser);
module.exports = router;