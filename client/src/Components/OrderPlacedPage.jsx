import React from 'react'
import { IoBagCheck } from "react-icons/io5";
import { Link } from 'react-router-dom';

const OrderPlacedPage = () => {
  return (
    <>
    <div className='orderPlaced-mainContainer'>
        <div className='orderPlaced-subContainer'>
            <IoBagCheck className='orderPlacedIcon'/>
            <span className='thankYouText'>Thank You!</span>
            <span className='orderSuccessMsg'>Your Order is Placed Successfully!</span>
            <Link to='/homepage'><button>Back to Home</button></Link>
        </div>
    </div>
    </>
  )
}

export default OrderPlacedPage;
