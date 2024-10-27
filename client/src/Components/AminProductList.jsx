import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const AdminProductList = () => {
  const [search, setSearch] = useState("");
  const [noProduct, setNoProduct] = useState(true);
  const [products, setProducts] = useState([]);

 useEffect(() =>{
  const fetchProducts = async() =>{
    try{
      const allProducts = await axios.get("http://localhost:5000/api/products/getProducts");
      setProducts(allProducts.data.products);
      setNoProduct(allProducts.data.length === 0);
    } catch (error) {
      console.error("Error occured while getting Products:", error);
    }
  }

  fetchProducts();
 }, []);

  const filteredData = products.filter((item) => {
    
    const searchTerm = search.toLowerCase();
    try{
      return(
        search === "" ? item :
        item.name.toLowerCase().includes(searchTerm) ||
        item.price.toString().includes(searchTerm) ||
        item.ratings.toString().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm) ||
        item.seller.toLowerCase().includes(searchTerm) ||
        item.stock.toString().includes(searchTerm)
      )
    } catch (error){
      console.error("Error during Search filter: ",error);
    }
  })
  
  useEffect (() =>{
    setNoProduct(filteredData.length === 0);
  },[filteredData]);

  const handleDeleteProducts = async (id) =>{
    try{
      const deleteProduct = await axios.delete(`http://localhost:5000/api/products/deleteProducts/${id}`);
      setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
      if(deleteProduct.status === 200){
        console.log("Product deleted Successfully");
      }
    } catch(error) {
      console.log("Product can't deleted, An error occured");
    }
  }

  return (
    <>
      <div className="productList-container">
        <div className="admin-nav">
          <h2>PRODUCTS</h2>
          <Link to = "/adminAddProducts"><button className="productList-btn">Add Products</button></Link>
        </div>
        <div className="admin-search">
          <input type="text" placeholder="Search Products..." value={search} onChange={(e) => setSearch(e.target.value)}/> 
          <IoSearchOutline className="search-btn"/>
          </div>
          <div className="filter-container">
          <select className="admin-category">
            <option value="category" selected hidden>Category</option>
            <option value="stationary">Stationary</option>
            <option value="mobiles">Electronics</option>
            <option value="shoes">Fashion & Clothing</option>
            <option value="laptops">Home & Furniture</option>
            <option value="watches">Health & Beauty</option>
            <option value="sports">Sports</option>
            <option value="groceries">Groceries</option>
            <option value="others">Others</option>
            

          </select>

          <select className="admin-filter">
            <option value="filter" selected hidden>Filter</option>
            <option value="price-asc">Price - ascending</option>
            <option value="price-dec">Price - decending</option>
            <option value="in-stock">in-Stock</option>
            <option value="out of stock">Out of Stock</option>

          </select>
          </div>
          <div className="table-container">
        <table className="admin-table" border="2px">
          <thead>
           <tr className="admin-thead">
              <td>S.no</td>
              <td>Image</td>
              <td>Product</td>
              <td>Price</td>
              <td>Ratings</td>
              <td>Category</td>
              <td>Seller</td>
              <td>Stock</td>
              <td>Edit/Delete</td>
            </tr>
          </thead>
          <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} className="admin-tbody">
              <td>{index+1}</td>
              <td>
                {item.image ? (<img src={`http://localhost:5000/${item.image}`} alt={item.name} />) : (<span>Image is not available</span>)}
              </td>
              <td>{item.name}</td>
              <td>₹ {item.price}</td>
              <td>{item.ratings}</td>
              <td>{item.category}</td>
              <td>{item.seller}</td>
              <td>{item.stock}</td>
              <td className="editDelete-btns"><FaEdit className="admin-edit"/> <MdDelete className="admin-delete" onClick={() => handleDeleteProducts(item._id)}/></td>
            </tr>
          ))}
          </tbody>
        </table>
        { noProduct && (<div className="noProduct">
        <span>No Products Found</span>
        </div>)}
        </div>
      </div>
    </>
  );
};

export default AdminProductList;
