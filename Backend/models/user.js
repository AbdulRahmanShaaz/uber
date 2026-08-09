const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters long"]
        },
        lastName: {
            type: String,
            required: true,
            minlength: [3, "Last name must be at least 3 characters long"]
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email must be at least 5 characters long"]
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [6, "Password must be at least 6 characters long"]
    },
    socketId: {
        type: String,
        default: null
    },
}, {
    timestamps: true
});

userSchema.methods.generateToken = function () {
    const token = jwt.sign({
        userId: this._id
    }, process.env.JWT_SECRET || "dev-secret", {
        expiresIn: "24h"
    });
    return token;
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashedPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const User = mongoose.model("User", userSchema);

module.exports = User;