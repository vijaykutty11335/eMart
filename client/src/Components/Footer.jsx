import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
            <footer className='footer-container'>
          <div className='col1'>
            <span>Customer Support</span>
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Shipping & Returns</li>
            <li>Order Tracking</li>
            <li>Size Guide</li>
          </div>
          <div className='col2'>
          <span>Shop</span>
          <li>New Arrivals</li>
          <li>Best Sellers</li>
          <li>Sale</li>
          <li>Gift Cards</li>
          </div>
          <div className='col3'>
          <span>About Us</span>
          <li>Our Story</li>
          <li>Sustainability</li>
          <li>Careers</li>
          <li>Fashion Inspiration</li>
          <li>Press</li>
          </div>
          <div className='col4'>
          <span>Policies</span>
          <li>Privacy Policy</li>
          <li>Terms & Conditions</li>
          <li>Refund Policy</li>
          <li>Payment Security</li>
          </div>
          <div className='contact'>
            <FaInstagram className='contact-icon'/>
            <FaFacebook className='contact-icon'/>
            <FaLinkedin className='contact-icon'/>
            <FaXTwitter className='contact-icon'/>
          </div>
        </footer>
        <div className='copyrights'>
        <span>Copyright © 2024 Styles. All Rights Reserved.</span>
        </div>
    </>
  )
}

export default Footer
