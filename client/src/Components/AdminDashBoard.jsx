import React from 'react'
import { Link } from 'react-router-dom'
const AdminDashBoard = () => {
  return (
    <>
    <div className='dashboard-mainContainer'>
    <div className="admin-nav">
          <img src="./logo-png/styles-high-resolution-logo-grayscale-transparent (2).png" alt="logo" />
          <Link to='/homepage'><button className='list-btn'>Home</button></Link>
          <Link to='/adminDashboard'><button className="list-btn">Dashboard</button></Link>
          <Link to="/adminAddProducts"><button className="list-btn">Add Products</button></Link>
          <Link to="/adminProductList"><button className="list-btn">Products</button></Link>
          <button className="list-btn">Orders</button>
          <Link to="/adminUserDetails"><button className="list-btn">Users</button></Link>
          
        </div>
        <span>this is admin dashboard</span>
    </div>
    </>
  )
}

export default AdminDashBoard
