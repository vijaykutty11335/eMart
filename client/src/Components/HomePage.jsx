import React from 'react';
import Navbar from './Navbar';
import { GoArrowRight } from "react-icons/go";
import { RiLoopRightFill } from "react-icons/ri";
import { IoLockClosedOutline } from "react-icons/io5";
import { IoUmbrellaOutline } from "react-icons/io5";
import Footer from './Footer';
import {Link} from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <div className='body-container'>
        <Navbar/>
        <div className='landingImg-container'>
          <img className="home-img" src="./Fashions/pexels-olly-845434.jpg" alt="home img" />
          <div className='welcome-text'>
            <span className='welcome-text1'>Unleash Your Style with Us!</span>
            <span className='welcome-text2'>Dive into the world of trends and timeless elegance.</span>
            <Link to='/userProductList'><button className='explore-btn'>Explore<GoArrowRight className='explore-arrow'/></button></Link>

          </div>
        </div>
        <div className='featuredItems-heading'>
            <span>Featured Items</span>
          </div>
        <div className='featured-items'>
          <div className='img1-container'>
            <img src="./samples/img-1.jpg" alt="img-1" width={250} height={270}/>
            <p className='name1'>Leriya Fashion</p>
            <p className='rate1'>₹ 799</p>
          </div>

          <div className='img2-container'>
            <img src="./samples/img-2.png" alt="img-2" width={250} height={270}/>
            <p className='name2'>Urbano</p>
            <p className='rate2'>₹ 1499</p>
          </div>

          <div className='img3-container'>
            <img src="./samples/img-3.jpg" alt="img-3" width={250} height={270}/>
            <p className='name3'>Ethnic Junction</p>
            <p className='rate3'>₹ 599</p>
          </div>
        </div>
        <div className='accessories-heading'>
        <span>Trending Accessories</span>
        </div>
        <div className='accessories'>
        <div className='accessories1'>
            <img src="./samples/accessories1.jpg" alt="accessories1" width={250} height={270}/>
            <p className='title1'>The Gusto</p>
            <p className='price1'>₹ 1799</p>
          </div>
          <div className='accessories2'>
            <img src="./samples/accessories2.jpg" alt="accessories2" width={250} height={270}/>
            <p className='title2'>U.S. POLO ASSN.</p>
            <p className='price2'>₹ 2159</p>
          </div>
          <div className='accessories3'>
            <img src="./samples/accessories3.jpg" alt="accessories3" width={250} height={270}/>
            <p className='title3'>Fastrack</p>
            <p className='price3'>₹ 890</p>
          </div>
        </div>
        <div className='support'>
          <span>Support</span>
        </div>
        <div className='support-container'>
          <div className='support1'>
            <RiLoopRightFill className='support1-img'/>
            <p>Free Shipping and Returns</p>
          </div>
          <div className='support2'>
            <IoLockClosedOutline className='support2-img'/>
            <p>Secured Payments</p>
          </div>
          <div className='support3'>
            <IoUmbrellaOutline className='support3-img'/>
            <p>Customer Service</p>
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default HomePage;
