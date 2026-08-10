const Captain = require('../models/captain');

module.exports.captainServices = async (captainData) => {
    try {
        const { fullName = {}, email, password, vehicle } = captainData;
        const firstName = fullName.firstName;
        const lastName = fullName.lastName;

        if (!firstName || !lastName || !email || !password) {
            throw new Error("Missing required fields");
        }

        const newCaptain = await Captain.create({
            fullName: {
                firstName,
                lastName
            },
            email,
            password,
            vehicle: {
                color: vehicle?.color,
                plate: vehicle?.plate,
                capacity: vehicle?.capacity,
                vehicleType: vehicle?.vehicleType,
                location: {
                    latitude: vehicle?.location?.latitude,
                    longitude: vehicle?.location?.longitude
                }
            }
        });

        return newCaptain;
    } catch (error) {
        console.error("Error creating captain:", error);
        throw error;
    }
};

module.exports = {
    captainServices: module.exports.captainServices
};