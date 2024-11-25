import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const AdminUserDetails = () => {

  const [users, setUsers] = useState([]);
  const [noUsers, setNoUsers] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleGetUsers = async () => {
      try{
        const fetchedUsers = await axios.get("http://localhost:5000/api/users/getUsers");
        console.log("Users Fetched Successfully!")
        const usersArray = fetchedUsers.data.users;
        setUsers(usersArray);
        setNoUsers(usersArray.length === 0);
        console.log(usersArray);
      } catch(error) {
        console.error(error.message);
      }
    }
    handleGetUsers();
  }, []);

  const handleDeleteUser = async(id) => {
    try{
      const deleteUser  = await axios.delete(`http://localhost:5000/api/users/deleteUser/${id}`);
      setUsers((prevUsers) => prevUsers.filter(user => user._id !== id));
      if(deleteUser.status === 200){
        toast.success("User Deleted Successfully!");
      }
      console.log("User deleted successfully!");
    } catch(error) {
      console.error(error.message);
    }

  }

  const filteredUser = users?.filter((user) => {
    return(
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    )
  })

  return (
    <>
      <div className="main-container">
      <div className="admin-nav">
          <img src="./logo-png/styles-high-resolution-logo-grayscale-transparent (2).png" alt="logo" />
          <Link to='/homepage'><button className='list-btn'>Home</button></Link>
          {/* <Link to='/adminDashboard'><button className="list-btn">Dashboard</button></Link> */}
          <Link to="/adminAddProducts"><button className="list-btn">Add Products</button></Link>
          <Link to="/adminProductList"><button className="list-btn">Products</button></Link>
          {/* <button className="list-btn">Orders</button> */}
          <Link to="/adminUserDetails"><button className="list-btn">Users</button></Link>
          
        </div>
        <div className="admin-search">
          <input
            type="text"
            placeholder="Search Users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="adminSearch-icon">
            <IoSearchOutline className="search-btn" />
          </div>
        </div>
        <div className="table-container">
          <table className="admin-table" border="2px">
          <thead>
            <tr className="admin-thead">
              <th>S.No</th>
              <th>Username</th>
              <th>Role</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Delete</th>
            </tr>
            </thead>
            <tbody>
              { filteredUser?.map((user, index) => (
              <tr key={index} className="admin-tbody">
                <td>{index+1}</td>
                <td>{user.username}</td>
                <td><span className='admin-role'>{user.role}</span></td>
                <td>{user.email}</td>
                <td>{user.createdAtDate}<br/>{user.createdAtTime}</td>
                <td><MdDelete className="admin-delete" onClick={() => {
                  if(user.role === "admin"){
                    toast.warn("Admin account cannot be deleted.")
                    return;
                  }
                  handleDeleteUser(user._id);
                  }}/></td>
              </tr>))
              }
            </tbody>
          </table>
          {noUsers && <div className='noUsers'><span>No Users Found</span></div>}
        </div>
        <ToastContainer/>
      </div>
    </>
  )
}

export default AdminUserDetails
