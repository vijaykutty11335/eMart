const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Get All Users
router.get('/getUsers', async(req, res) => {
    try{
        const users = await User.find();
        res.status(200).json({message: "Users Fetched Successfully!", users:users});
    } catch(error){
        res.status(500).json({message: "An Error Occured while fetching Users"});
        console.error(error.message);
    }

})

//Get user By Id
router.get('/getUserById/:id', async(req,res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json({message: "User Fetched Successfully!", user:user});

    } catch(error) {
        res.status(500).json({message: "An Error Occured while fetching the User"});
        console.error(error.message);
    }
})
module.exports = router;

//Delete User
router.delete('/deleteUser/:id', async(req,res) => {
    try{
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        if(!deleteUser){
            res.status(404).json({message: "User not Found"});
        }
        res.status(200).json({message: "User Deleted Successfully!"});
        
    } catch(error) {
        res.status(500).json({message: "An Error occured"});
        console.error(error.message);
    }
})