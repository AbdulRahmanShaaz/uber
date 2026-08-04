const user = require("../models/user");

const createUser = async (userData) => {
    try {
        const { fullName = {}, email, password } = userData;
        const newUser = await user.create({
            fullName: {
                firstName: fullName.firstName,
                lastName: fullName.lastName || ""
            },
            email,
            password
        });
        return newUser;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

module.exports = {
    createUser
};