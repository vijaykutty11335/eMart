import React, { useState, useRef } from "react";
import { RiImageAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function AdminAddProducts() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [error, setError] = useState("");
  const [ratingsError, setRatingsError] = useState("");
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [fields, setFields] = useState({
    name: "",
    price: "",
    description: "",
    ratings: "",
    category: "",
    seller: "",
    stock: "",
  });


  const handleOnchange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file){
      setSelectedImg(URL.createObjectURL(file));
    }
  };

  const handleClear = (e) =>{
    setFields({
        name: "",
        price: "",
        description: "",
        ratings: "",
        category: "",
        seller: "",
        stock: ""
    });
    setSelectedImg("");
  }

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if(fields.ratings > 5 || isNaN(fields.ratings) || fields.ratings < 0)
    {
      setRatingsError("Ratings must be a number between 0 to 5");
      return;
    }
    setRatingsError("");

    const formData = new FormData();
    formData.append('name', fields.name);
    formData.append('price', fields.price);
    formData.append('description', fields.description);
    formData.append('ratings', fields.ratings);
    formData.append('category', fields.category);
    formData.append('seller', fields.seller);
    formData.append('stock', fields.stock);
    
    const imgFile = fileInputRef.current.files[0];
    if(imgFile){
      formData.append('image', imgFile);
    }

    

    try{

      await axios.post("http://localhost:5000/api/products/addProducts", formData, {
        headers: {
          'content-type' : 'multipart/form-data'
        }
      });

      toast.success("Product added Successfully");
      setFields({
        name: "",
        price: "",
        description: "",
        ratings: "",
        category: "",
        seller: "",
        stock: "",
      });
      setSelectedImg("");
      setError("");

    } catch(error){
      console.error("Error adding product:", error.response.data);
      setError(error.response?.data?.message || "An error occured");
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="admin-nav">
          <h2>ADD PRODUCTS TO E-MART</h2>
          <Link to="/adminProductList">
            <button className="productList-btn">Product List</button>
          </Link>
        </div>
        <form className="productFileds-container"  onSubmit={handleAddProduct} encType="multipart/form-data">
          <div className="addImg-container">
            <RiImageAddLine className="addimg" />
            {selectedImg && <img src={selectedImg} />}
          </div>
          <div className="productFields">
            {error && <span className="admin-error">{error}</span>}
            <label htmlFor="name">Product Name :</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Product Name"
              value={fields.name}
              onChange={handleOnchange}
            />
            <label>Image :</label>
            <label htmlFor="img" className="ImgBtn">Browse</label>

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImgChange}
              ref={fileInputRef}
              style={{ display: "none" }}
              id="img"
              name="image"
            />
            <label htmlFor="price">Price :</label>
            <input
              type="text"
              name="price"
              placeholder="Enter Price"
              value={fields.price}
              onChange={handleOnchange}
            />
            <label htmlFor="description">Description :</label>
            <textarea
              name="description"
              placeholder="Enter Description"
              value={fields.description}
              onChange={handleOnchange}
            ></textarea>
            <label htmlFor="ratings">Ratings :</label>
            <input
              type="text"
              name="ratings"
              placeholder="Enter Ratings"
              value={fields.ratings}
              onChange={handleOnchange}
            />
            {ratingsError && <span className="admin-ratingsError">{ratingsError}</span>}
            <label htmlFor="category">Category :</label>
            <div className="filter-container">
              <select
                className="admin-category"
                name="category"
                value={fields.category}
                onChange={handleOnchange}
              >
                <option value="category" selected hidden>
                  Category
                </option>
                <option value="stationary">Stationary</option>
                <option value="mobiles">Electronics</option>
                <option value="shoes">Fashion & Clothing</option>
                <option value="laptops">Home & Furniture</option>
                <option value="watches">Health & Beauty</option>
                <option value="sports">Sports</option>
                <option value="groceries">Groceries</option>
                <option value="others">Others</option>
              </select>
            </div>
            <label htmlFor="seller">Seller :</label>
            <input
              type="text"
              name="seller"
              placeholder="Enter Seller"
              value={fields.seller}
              onChange={handleOnchange}
            />
            <label htmlFor="stock">Stock :</label>
            <input
              type="text"
              name="stock"
              placeholder="Enter Stock"
              value={fields.stock}
              onChange={handleOnchange}
            />
          </div>
          <div className="admin-btns">
            <button type="submit" className="add-btn">
              Add Product
            </button>
            <label className="clr-btn" onClick={handleClear}>Clear</label>
          </div>
        </form>
        <ToastContainer/>
      </div>
    </>
  );
}
