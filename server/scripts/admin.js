const User = require('../models/user');
const bcrypt = require('bcryptjs');

async function CreateAdminAccount() {
    try{
        const existingAdmin = await User.findOne({email: "admin@gmail.com"});
        if(!existingAdmin){
            const newAdmin = new User({
                username: "admin",
                email: "admin@gmail.com",
                password: "admin11",
                role: "admin"
            })
            await newAdmin.save();
            console.log("Admin Account created Successfully!");
        } else {
            console.log("Admin already exist");
        }
    } catch(error){
        console.error(error.message);
    }
}

module.exports = CreateAdminAccount;