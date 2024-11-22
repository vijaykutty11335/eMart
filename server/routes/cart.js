const express = require('express');
const User = require('../models/user');
const router = express.Router();
const {authenticateToken} = require('../utils/authMiddleware')

router.post('/addCart', authenticateToken, async(req,res) => {
    const userId = req.user.userId;
    const {productId, quantity} = req.body;
    try{
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({message: "User not Found"});

        const cartItem = user.cart.find(item => item.productId.toString() === productId);

        if(cartItem){
            cartItem.quantity += quantity;
        } else {
            user.cart.push({productId, quantity});
        }

        await user.save();
        res.status(200).json({message: "Product added to cart", cart: user.cart});

    } catch(error) {
        console.error(error);
        res.status(500).json({message: "An error occured"});
    }
})

router.get('/getCart', authenticateToken, async(req,res) => {
    const userId = req.user.userId;
    try{
        const user = await User.findById(userId).populate('cart.productId');
        if(!user) return res.status(404).json({message: "User not Found"});

        res.status(200).json({message: "Cart items fetched Successfully!", cart: user.cart});
    } catch(error) {
        res.status(500).json({message: "An error occured"});
        console.error(error);
    }
})

router.put('/updateCart', authenticateToken, async(req, res) => {
    const userId = req.user.userId;
    const {productId, quantity} = req.body;

    try{
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({message: "User not Found"});
    
        const cartItem = user.cart.find(item => item.productId.toString() === productId);
        if(!cartItem) return res.status(404).json({message: "Product not Found in Cart"});
    
        cartItem.quantity = quantity;
        await user.save();
        res.status(200).json({message: "Cart Updated Successfully!", cart: user.cart});
    } catch (error) {
        res.status(500).json({message: "An error occured"});
        console.error(error.message);
    }
})

router.delete('/deleteCart/:productId', authenticateToken, async(req,res) => {
    const userId = req.user.userId;
    const {productId} = req.params;

    try{
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({message: "User not Found"});

        user.cart = user.cart.filter(item => item.productId.toString() !== productId);
        await user.save();
        res.status(200).json({message: "Cart product Deleted Successfully!", cart: user.cart });
    } catch(error) { 
        res.status(500).json({message: "An error occured"});
        console.error(error.message);
    }
})

module.exports = router;