import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5";
import { BsHandbag } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { RiHome2Line } from "react-icons/ri";
import { PiCoatHanger } from "react-icons/pi";
import { MdOutlinePhone } from "react-icons/md";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

  const [searchTerm, setSearchterm] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if(token){
      const decodeToken = JSON.parse(atob(token.split('.')[1]));
      setUsername(decodeToken.username);
      setRole(dropDown.role);

      if(decodeToken.role === "admin"){
        setIsAdmin(true);
      }
    }
  }, [token]);

  const handleSearch = () => {
    if(searchTerm.trim()){
      navigate(`/userProductList?search=${searchTerm}`);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/homepage');
  }

  const handleKeyDown = (e) => {
    if(e.key==='Enter'){
      handleSearch();
    }
  }

  return (
    <>
      
        <div className='nav-container'>
          <div className='nav-logo'>
          <Link to='/homepage'><img src='./logo-png/styles-high-resolution-logo-transparent (1).png' alt='logo' width={150} height={40}/></Link>
          </div>
          <div className='search-group'>
            <input type="input" placeholder='Search Products...'
            value={searchTerm}
            onChange={(e) => setSearchterm(e.target.value)}
            onKeyDown={handleKeyDown}
            />
            <IoSearchOutline className='search-icon'/>
          </div>
          <div className='home-link'>
            <RiHome2Line className='home-icon'/>
            <Link to='/homepage'><a href="#">Home</a></Link>
          </div>
          <div className='product'>
            <PiCoatHanger className='product-icon'/>
          <Link to ='/userProductList'><a href="#">Products</a></Link>
          </div>
          <div className='cart-logo'>
            <BsHandbag className='cart-icon'/>
            <Link to ='/addtoCart'><a href="#">Bag</a></Link>
          </div>
          <div className='contact-us'>
            <MdOutlinePhone className='contactus-icon'/>
            <Link to="/contactUs"><a href='#'>Contact Us</a></Link>
          </div>
          {token ? 
          (
            <>
            {username && 
              <>
              <div className='logged-in'>
            <button className='user-btn' onClick={() => {setDropDown(prev => !prev)}}>{username.charAt(0).toUpperCase()}</button>
            </div>

            {dropDown &&
            <div className='dropdown-menu'>
              <Link to='/userProfilePage' className='userCircle'>Profile</Link>
              {isAdmin && <button onClick={() => {navigate('/adminAddProducts')}}>Dashboard</button>}
              <button onClick={handleLogout} className='logout-btn'>Logout</button>
            </div>}
            </>
            }
            </>
          )
          :
          (
            <>
          <div className='login-signup'>
            <CgProfile className='profile-icon'/>
           <Link to="/signup"><a href="#">Signup</a></Link> / 
           <Link to="/login"><a href="#">Login</a></Link>
          </div>
          </>
          )}


        </div>
     
    </>
  )
}

export default Navbar
