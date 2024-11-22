import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaRegIdBadge } from "react-icons/fa";

const UserProfilePage = () => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  const token = localStorage.getItem("token");
  
  useEffect(() => {
    const decodeToken = JSON.parse(atob(token.split('.')[1]));
    setUserId(decodeToken.userId);
    setUsername(decodeToken.username);
    setRole(decodeToken.role);
    setEmail(decodeToken.email);
  }, [token]);

  return (
    <>
    <div className='profile-mainContainer'>
      <div className='profile-subContainer'>
        <Navbar/>
        <div className='profile-container'>
          <div className='userProfile'>
          <button>{username.charAt(0).toUpperCase()}</button>
          </div>
          <div className='profile-role'>
            <span>{role}</span>
          </div>
          <div className='profile-username'>
            <FaRegUserCircle className='profileIcon'/>
          <span>{username}</span>
          </div>
          <div className='profile-userId'>
            <FaRegIdBadge className='userIdIcon'/>
            <p>User Id : <span>{userId}</span></p>
          </div>
          <div className='profile-email'>
          <MdOutlineMailOutline className='emailIcon'/>
          <span>{email}</span>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}

export default UserProfilePage
