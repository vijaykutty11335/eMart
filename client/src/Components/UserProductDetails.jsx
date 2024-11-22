import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { IoStar } from "react-icons/io5";
import { MdVerifiedUser } from "react-icons/md";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';

const UserProductDetails = ({ productId }) => {
    const [fetchedProduct, setFetchedProduct] = useState();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const decodeToken = JSON.parse(atob(token.split('.')[1]));

    const fetchProductById = async() =>{
        try{
            const fetchedProductById = await axios.get(`http://localhost:5000/api/products/getProduct/${productId}`,{
                headers: { 'Content-Type': 'multipart/form-data' }
              });
              console.log(fetchedProductById);
              const productArray = [fetchedProductById.data.product];
            setFetchedProduct(productArray);
        } catch(error){
            console.error(error);
        }
    }   

    const addToCart = async() => {
        try{
            if(token){
                const addCart = await axios.post('http://localhost:5000/api/cart/addCart',
                    {
                    productId: productId,
                    quantity: 1
                    },
            {
                headers: {
                Authorization: `Bearer ${token}`
            }
            })
            toast.success("Product Added to Cart!");
            console.log("Product added to cart Successfully!", addCart.data)
            }
            else{
                console.log("token not available");
            }
            
        } catch(error){
            console.log("product id not available")
        }
    }

    useEffect(() => {
        if (productId) fetchProductById();
    }, [productId]);
    return (
        <>
            <div className='productDetails-mainContainer'>
                <div className='productDetails-subContainer'>
                    <Navbar />
                    { fetchedProduct?.map((item, index) => (
                        <div className='productDetails-container' key={index}>
                        <div className='productDetails-left'>
                            <img src={`http://localhost:5000/${item.image}`} alt={item.image} />
                        </div>
                        <div className='productDetails-right'>
                            <div className='productDetails-title'>
                                <p>{item.name}</p>
                            </div>
                            <p className='productDetails-id'><span>Product Id : </span>{item._id}</p>
                            <div className='productDetails-ratings'>
                                <p>Ratings: <span>{item.ratings}</span></p>
                                <IoStar className='productDetails-starIcon' />
                            </div>
                            <p className='productDetails-price'>₹ {item.price}</p>
                            <div className='productDetails-verified'>
                                <MdVerifiedUser className='verified-icon' />
                                <span>Verified</span>
                            </div>
                            <p className='productDetails-category'>{item.category}</p>
                            <div className='productDetails-btns'>
                                <button className='buynowBtn'>Buy Now</button>
                                <button className='cartBtn' onClick={addToCart}>Add to Cart</button>
                            </div>
                            <div className='productDetails-description'>
                                <h2>Description :</h2>
                                <p>{item.description}</p>
                            </div>
                            <p className='productDetails-seller'>Sold by : <span>{item.seller}</span></p>
                        </div>
                    </div>
                    ))}
                </div>
                <ToastContainer/>
            </div>
        </>
    )
}

export default UserProductDetails
