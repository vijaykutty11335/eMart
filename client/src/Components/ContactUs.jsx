import React from 'react'
import Navbar from './Navbar'
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ContactUs = () => {
  return (
    <>
      <div className='contact-mainContainer'>
        <div className='contact-subContainer'>
          <Navbar />
          <div className='contact-left'>
            <div className='top-container'>
              <h1>Contact Us</h1>
              <div className='contact-msg'>
                <p>Email, Call or Complete the form to learn how Styles can solve your messaging problems.</p>
              </div>
              <div className='contact-mail'>
                <p>vijay.s11335@gmail.com</p>
                <p>9360477284</p>
              </div>
              <div className='socialmedia'>
                <FaInstagram className='contact-icon' />
                <FaLinkedin className='contact-icon' />
                <FaFacebook className='contact-icon' />
                <FaXTwitter className='contact-icon' />
              </div>
            </div>
            <div className='bottom-container'>
              <div className='contact-col1'>
              <h3>Product Information</h3>
              <span>Have questions about our products and services? Our team is available to provide detailed information to help you get the most out of Styles.</span>
              </div>
              <div className='contact-col2'>
                <h3>Feedback and Suggestions</h3>
                <span>We value your feedback and are continuously working to improve Styles. Your input is crucial in shaping the future of Styles.</span>
              </div>
              <div className='contact-col3'>
                <h3>Customer Support</h3>
                <span>Our support team is available around the clock to address any concerns or queries you may have.</span>
              </div>
            </div>
          </div>
          <form action="https://api.web3forms.com/submit" method="POST" className='contact-right'>
          <input type="hidden" name="access_key" value="6c817435-b3ab-4760-9d58-db555a0daf32"></input>
            <div className='contactForm-container'>
              <div className='contactForm-heading'>
                <p className='getintouch'>Get in Touch</p>
                <hr />
                <p className='contact-subheading'>You can reach us anytime</p>
              </div>
              <div className='contact-form'>
                <input type="text" name="name" placeholder='Your Name' required/>
                <input type="email" name="email" placeholder='Your Email' required/>
                <textarea name="feedback" placeholder='How can we help ?' required/>
                <button type='submit'>Submit</button>
              </div>
              <div className='contact-acceptTC'>
                <p>By contacting us, you agree to our <span>Terms of Services</span> and <span>Privacy Policy</span>.</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ContactUs
