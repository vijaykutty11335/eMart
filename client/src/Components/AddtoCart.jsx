import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { IoIosAddCircleOutline } from "react-icons/io";
import { HiOutlineMinusCircle } from "react-icons/hi2";
import { IoStar } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const AddtoCart = () => {

    const [cartItems, setCartItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [estimatedPrice, setEstimatedPrice] = useState(0);
    const [productCount, setProductCount] = useState(0);

    const token = localStorage.getItem("token");
    const decodeToken = JSON.parse(atob(token.split('.')[1]));

    useEffect(() => {
        const handleFetchCart = async () => {
            if (!token) return;

            try {
                const getCart = await axios.get('http://localhost:5000/api/cart/getCart',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setCartItems(getCart.data.cart);
            } catch (error) {
                console.error("Error fetching cart:", error.message);
            }
        }
        handleFetchCart();
    }, []);

    const handleUpdateQnty = async (productId, newQuantity) => {
        try {
            axios.put('http://localhost:5000/api/cart/updateCart',
                { productId: productId, quantity: newQuantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Quantity Updated Successfully!", newQuantity);

        } catch (error) {
            console.error("Error updating cart:", error.message);
        }
    }

    const handleDeleteCart = async (productId) => {
        if (!token) return;

        try {
            axios.delete(`http://localhost:5000/api/cart/deleteCart/${productId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setCartItems(prev => prev.filter(item => item.productId._id !== productId));
            toast.success("Item deleted successfully from Cart!");
            console.log("Item deleted form cart Successfully!");

        } catch (error) {
            console.error("Error deleting cart:", error.message);
        }
    };

    useEffect(() => {
        let totalPrice = 0;
        let totalQnty = 0;

        for (let i = 0; i < cartItems.length; i++) {
            totalQnty += cartItems[i].quantity;
            totalPrice += (cartItems[i].quantity * cartItems[i].productId.price);
        }
        setTotalQuantity(totalQnty);
        setEstimatedPrice(totalPrice);
    }, [cartItems]);

    useEffect(() => {
        setProductCount(cartItems.length);
    }, [cartItems]);


    return (
        <>
            <div className='cart-mainContainer'>
                <div className='cart-subContainer'>
                    <Navbar />
                    <div className='cart-left'>

                        {cartItems?.map((item, index) => (
                            <div key={index} className='cartProduct-container'>
                                <div className='cartImg'><img src={`http://localhost:5000/${item.productId.image}`} alt="cart-img" /></div>
                                <div className='cart-text'>
                                    <div className='cart-title'><span>{item.productId.name}</span></div>
                                    <div className='cart-price'><span>₹ {item.productId.price}</span></div>
                                    <div className='cart-ratingCategory'>
                                        <div className='cart-rating'>
                                            <span>{item.productId.ratings}</span>
                                            <IoStar className='cart-ratingIcon' />
                                        </div>
                                        <div className='cart-category'>{item.productId.category}</div>
                                    </div>
                                </div>
                                <div className='cart-container3'>
                                    <div className='cart-incDec'>
                                        
                                        <HiOutlineMinusCircle className='cart-subIcon' onClick={() => {
                                            if (token && item.quantity > 1) {
                                                handleUpdateQnty(item.productId._id, item.quantity - 1);
                                                item.quantity -= 1;
                                                setCartItems([...cartItems]);
                                            }
                                        }
                                        } />
                                        <span>{item.quantity}</span>
                                        <IoIosAddCircleOutline className='cart-addIcon' onClick={() => {
                                            if (token) {
                                                handleUpdateQnty(item.productId._id, item.quantity + 1);
                                                item.quantity += 1;
                                                setCartItems([...cartItems]);
                                            }
                                        }} />
                                    </div>
                                    <div className='cart-delete'>
                                        <MdDelete className='cart-deleteIcon' onClick={() => handleDeleteCart(item.productId._id)} />
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                    <div className='cart-right'>
                        <div className='order-summaryContainer'>
                            <div className='orderSummary'><span>Order Summary</span></div>
                            <div className='summary-text'>
                                <div>Products Count : {productCount}</div>
                                <div>Sub Total : {totalQuantity} (Units)</div>
                                <div>Est. Total : ₹ {estimatedPrice}</div>
                            </div>
                            <div className='proceed-btn'>
                                <button>Proceed to Buy</button>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>

            </div>
        </>
    )
}

export default AddtoCart
