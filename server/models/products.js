const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name : {type: String, required: true},
    image : {type: String, required: true},
    price : {type: Number, required: true},
    description : {type: String, required: true},
    ratings : {type: Number, required: true},
    category : {type: String, required: true},
    seller : {type: String, required: true},
    stock : {type: Number, required: true},
    createdAtDate: { 
      type: String, 
      default: () => new Date().toLocaleDateString('en-IN')
    },
    createdAtTime: { 
      type: String, 
      default: () => new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })
    },
  });

const productsModel = mongoose.model('Product', ProductSchema);
module.exports = productsModel;