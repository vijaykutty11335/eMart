import React, { useState, useRef, useEffect } from "react";
import { RiImageAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
// import { useNavigate } from "react-router-dom";

export default function AdminAddProducts({product, onReset}) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [error, setError] = useState("");
  // const navigate = useNavigate();
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

  useEffect(() => {
    if(product){

      const fetchProduct = async () =>{
      try{
      const res = await axios.get(`http://localhost:5000/api/products/getProduct/${product}`, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setFields({
        name: res.data.product.name,
        price: res.data.product.price,
        description: res.data.product.description,
        ratings: res.data.product.ratings,
        category: res.data.product.category,
        seller: res.data.product.seller,
        stock: res.data.product.stock,
      });

      setSelectedImg(`http://localhost:5000/${res.data.product.image}`);

      }
      catch(error){
        console.error("Error fetching product details:", error);
        setError("Failed to load product details.");
      };
    };
    if (typeof product === 'string' && product.trim() !== '') {
      fetchProduct();
    }
    
  }  

  },[product]);

  const handleOnchange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file){
      setSelectedImg(URL.createObjectURL(file));
    }
  };

  const handleClearorCancel = (e) =>{
    if(product){
      onReset();

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
    else{
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
  }

  const handleAddorUpdateProduct = async (e) => {
    e.preventDefault();
    if(fields.ratings > 5 || isNaN(fields.ratings) || fields.ratings < 0)
    {
      setError("Ratings must be a number between 0 to 5");
      return;
    }
    if(fields.price < 0 || isNaN(fields.price)){
      setError("Price must be a Positive Number");
      return;
    }
    if(fields.stock < 0 || isNaN(fields.stock)){
      setError("Stock must be a Positive Number");
      return;
    }
    setError("");

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
      if(product){
        await axios.put(`http://localhost:5000/api/products/updateProduct/${product}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success("Product Updated Successfully!");
        onReset();
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
      }

      else{
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
    }

    } catch(error){
      console.error("Error adding product:", error.response.data);
      setError(error.response?.data?.message || "An error occured");
    }
  };
  

  return (
    <>
      <div className="main-container">
        <div className="admin-nav">
          <h2>ADD PRODUCTS</h2>
          <Link to="/adminUserDetails">
          <button className="list-btn">User Details</button>
          </Link>
          <Link to="/adminProductList">
            <button className="list-btn">Product List</button>
          </Link>
        </div>
        <form className="productFileds-container"  onSubmit={handleAddorUpdateProduct} encType="multipart/form-data">
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
            {/* {ratingsError && <span className="admin-ratingsError">{ratingsError}</span>} */}
            <label htmlFor="category">Category :</label>
            <div className="filter-container">
              <select
                className="admin-category"
                name="category"
                value={fields.category}
                onChange={handleOnchange}
              >
                <option value="" hidden>
                  Category
                </option>
                <option value="Stationary">Stationary</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion & Clothing">Fashion & Clothing</option>
                <option value="Home & Furniture">Home & Furniture</option>
                <option value="Health & Beauty">Health & Beauty</option>
                <option value="Sports">Sports</option>
                <option value="Groceries">Groceries</option>
                <option value="Others">Others</option>
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
              {product ? "Update Product" : "Add Product"}
            </button>
            <label className="clr-btn" onClick={handleClearorCancel}>{product ? "Cancel" : "Clear"}</label>
          </div>
        </form>
        <ToastContainer/>
      </div>
    </>
  );
}
