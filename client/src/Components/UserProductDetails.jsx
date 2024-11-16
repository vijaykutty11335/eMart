import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { IoStar } from "react-icons/io5";
import { MdVerifiedUser } from "react-icons/md";
import axios from 'axios';

const UserProductDetails = ({ product }) => {
    const [fetchedProduct, setFetchedProduct] = useState();

    const fetchProductById = async() =>{
        try{
            const fetchedProductById = await axios.get(`http://localhost:5000/api/products/getProduct/${product}`,{
                headers: { 'Content-Type': 'multipart/form-data' }
              });
              console.log(fetchedProductById);
              const productArray = [fetchedProductById.data.product];
              console.log("fetched Product by id", productArray);
            setFetchedProduct(productArray);
            console.log(typeof(productArray))
        } catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
        if (product) fetchProductById();
    }, [product]);
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
                                <button className='cartBtn'>Add to Cart</button>
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

            </div>
        </>
    )
}

export default UserProductDetails
