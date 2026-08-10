const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const captainSchema = new mongoose.Schema({
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
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
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
    status: {
        type: String,
        enum: ["available", "unavailable"],
        default: "unavailable"
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "Color must be at least 3 characters long"]
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Plate must be at least 3 characters long"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"]
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ["car", "motorcycle", "truck"]
        },
        location: {
            latitude: {
                type: Number,
                required: true
            },
            longitude: {
                type: Number,
                required: true
            }
        }
    }
}, {
    timestamps: true
});
captainSchema.methods.generateToken = function () {
    const token = jwt.sign({
        userId: this._id
    }, process.env.JWT_SECRET || "dev-secret", {
        expiresIn: "24h"
    });
    return token;
};
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
captainSchema.statics.hashedPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};
module.exports = mongoose.model("Captain", captainSchema);