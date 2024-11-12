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

    const image = req.file ? req.file.path.replace(/\\/g, '/') : '';

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

//getAllProducts route
router.get('/getProducts', async (req,res) => {
        try{
            const products = await productsModel.find();
            res.status(200).json({message: "Products fetched Successfully!",products:products});
        } catch(error){
            res.status(500).json({message: "An error occured"});
            console.log(error.message);
        }
})

//getProductById route
router.get('/getproduct/:id', async(req,res) =>{
    try{
        const product = await productsModel.findById(req.params.id);
        if(product){
            res.status(200).json({message: "Product fetched Successfully!", product : product});
        } else {
            res.status(404).json({message: "Product not Found!"});
        }
    } catch (error){
        res.status(500).json({message: "An error occured"});
        console.log(error.message);
    }
})

//updateProduct route
router.put('/updateProduct/:id', upload.single('image'), async (req,res) => {
    const {name, price, description, ratings, category, seller, stock} = req.body;
    const image = req.file ? req.file.path.replace(/\\/g, '/') : null;

    try{
        const product = await productsModel.findById(req.params.id);
        if(!product){
            res.status(404).json({message: "Product not Found!"});
            return;
        }

        product.name = name;
        product.price = price;
        product.description = description;
        product.ratings = ratings;
        product.category = category;
        product.seller = seller;
        product.stock = stock;

        if(image){
            if(product.image){
                fs.unlinkSync(path.join(__dirname, '../', product.image));
            }
        product.image = image;
        }

        await product.save();
        res.status(200).json({message: "Product Updated Successfully!", product});
    } catch(error){
        console.error("error updating product: ",error.message);
        res.status(500).json({message: "An eoor occured"});
    }
})

//deleteProduct route
router.delete('/deleteProduct/:id', async(req,res) =>{
    try{
        
        const deleteProducts = await productsModel.findByIdAndDelete(req.params.id);
        if (!deleteProducts) {
            return res.status(404).json({message: "Product not found!"});
        }
        fs.unlinkSync(path.join(__dirname, '../', deleteProducts.image));
        res.status(200).json({message: "Product deleted Successfully!", deleteProducts: deleteProducts});
    } catch(error){
        res.status(500).json({message: "An error occured"});
        console.log(error.message);
    }
})

module.exports = router;
