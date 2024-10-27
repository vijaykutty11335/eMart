const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const productsModel = require('../models/products');

const router = express.Router();
router.use(cors());

const uploadDir = path.join(__dirname, '../uploads');
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, 'uploads/');
    },
    filename: (req,file,cb) =>{
        cb(null, Date.now() + '-' + file.originalname);
    }
    
})
const upload = multer({storage});

//addProducts route
router.post('/addProducts',  upload.single('image'), async(req,res) =>{

    const {name, price, description, ratings, category, seller, stock} = req.body;

    const image = req.file ? req.file.path.replace(/\\/g, '/') : ''; // Normalize path for storage

    if (!req.file) {
        return res.status(400).json({ message: "Image file is required." });
    }
    
    try{
        const newProduct = new productsModel({name, image, price, description, ratings, category, seller, stock});
        await newProduct.save();
        res.status(201).json({message : "Product added Successfully!"});
    } catch(error) {
        
        console.log(error.message);
        res.status(500).send("An error occured");
    }
})

//getProducts route
router.get('/getProducts', async (req,res) => {
        try{
            const products = await productsModel.find();
            res.status(200).json({message: "Product get Successfully!",products:products});
        } catch(error){
            res.status(500).json({message: "An error occured"});
            console.log(error.message);
        }
})

//deleteProducts route
router.delete('/deleteProducts/:id', async(req,res) =>{
    try{
        
        const deleteProducts = await productsModel.findByIdAndDelete(req.params.id);
        if (!deleteProducts) {
            return res.status(404).json({message: "Product not found!"});
        }
        res.status(200).json({message: "Product deleted Successfully!", deleteProducts: deleteProducts});
    } catch(error){
        res.status(500).json({message: "An error occured"});
        console.log(error.message);
    }
})

module.exports = router;
