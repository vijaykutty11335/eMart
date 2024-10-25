const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Product = require('../models/products');
const cors = require('cors');

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

router.post('/addProducts',  upload.single('image'), async(req,res) =>{

    const {name, price, description, ratings, category, seller, stock} = req.body;

    const image = req.file ? req.file.path : '';

    if (!req.file) {
        return res.status(400).json({ message: "Image file is required." });
    }
    
    try{
        const newProduct = new Product({name, image, price, description, ratings, category, seller, stock});
        await newProduct.save();
        res.status(201).json({message : "Product added Successfully!"});
    } catch(error) {
        
        console.log(error.message);
        res.status(500).send("An error occured");
    }
})

module.exports = router;
