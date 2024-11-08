import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {fetchProducts, allProducts} from "../UtilFunctions/Products.api.js";
import { toast, ToastContainer } from "react-toastify";

const AdminProductList = ({setProduct}) => {
  const [search, setSearch] = useState("");
  const [noProduct, setNoProduct] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortby, setSortby] = useState("");

  const navigate = useNavigate();
  
  useEffect(() => {
    const loadProducts = async () =>{
    await fetchProducts();
    setProducts(allProducts || [])
    }
    loadProducts();
  }, []);

  const filteredData = products
  ?.filter((item) => {
    const searchTerm = search.toLowerCase();
    const categoryTerm = selectedCategory.toLowerCase();

      return (
        (search === "" || 
          item.name.toLowerCase().includes(searchTerm) ||
          item.price.toString().includes(searchTerm) ||
          item.ratings.toString().includes(searchTerm) ||
          item.category.toLowerCase().includes(searchTerm) ||
          item.seller.toLowerCase().includes(searchTerm) ||
          item.stock.toString().includes(searchTerm) ||
          item.createdAtDate.toString().includes(searchTerm) ||
          item.createdAtTime.toString().includes(searchTerm)
        ) && 
        (selectedCategory === "" || item.category.toLowerCase().includes(categoryTerm))
      );

  })
  .sort((a,b) => {
    if(sortby === "Price - ascending") return (a.price - b.price);
    else if(sortby === "Price - descending") return (b.price - a.price);
    else if(sortby === "Stock - ascending") return (a.stock - b.stock);
    else if(sortby === "Stock - descending") return (b.stock - a.stock);
    return 0;
  });

  useEffect(() => {
    setNoProduct(filteredData?.length === 0);
  }, [filteredData]);

  const handleDeleteProducts = async (id) => {
    try {
      const deleteProduct = await axios.delete(`http://localhost:5000/api/products/deleteProduct/${id}`);
      setProducts((prevProducts) => prevProducts.filter(product => product._id !== id));
      if (deleteProduct.status === 200) {
        toast.success("Product Deleted Successfully!");
        console.log("Product deleted successfully");
      }
    } catch (error) {
      console.log("Product can't be deleted. An error occurred.");
    }
  };

  return (
    <>
      <div className="productList-container">
        <div className="admin-nav">
          <h2>PRODUCTS</h2>
          <Link to="/adminUserDetails">
          <button className="list-btn">User Details</button>
          </Link>
          <Link to="/adminAddProducts"><button className="list-btn">Add Products</button></Link>
        </div>
        <div className="admin-search">
          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IoSearchOutline className="search-btn" />
        </div>
        <div className="filter-container">
          <select
            className="admin-category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" selected>Category</option>
            <option value="Stationary">Stationary</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion & Clothing">Fashion & Clothing</option>
            <option value="Home & Furniture">Home & Furniture</option>
            <option value="Health & Beauty">Health & Beauty</option>
            <option value="Sports">Sports</option>
            <option value="Groceries">Groceries</option>
            <option value="Others">Others</option>
          </select>

          <select className="admin-filter" value={sortby} onChange={(e) => setSortby(e.target.value)}>
            <option value="" selected>Sort by</option>
            <option value="Price - ascending">Price - ascending</option>
            <option value="Price - descending">Price - descending</option>
            <option value="Stock - ascending">Stock - ascending</option>
            <option value="Stock - descending">Stock - descending</option>
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
                <td>Created At</td>
                <td>Edit/Delete</td>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((item, index) => (
                <tr key={index} className="admin-tbody">
                  <td>{index + 1}</td>
                  <td>
                    {item.image ? (
                      <img src={`http://localhost:5000/${item.image}`} alt={item.name} />
                    ) : (
                      <span>Image not available</span>
                    )}
                  </td>
                  <td>{item.name}</td>
                  <td>₹ {item.price}</td>
                  <td>{item.ratings}</td>
                  <td>{item.category}</td>
                  <td>{item.seller}</td>
                  <td>{item.stock}</td>
                  <td>{item.createdAtDate}<br />{item.createdAtTime}</td>
                  <td className="editDelete-btns">
                    <FaEdit className="admin-edit" onClick={()=>{setProduct(item._id); navigate('/adminAddProducts')}}/>
                    <MdDelete className="admin-delete" onClick={() => handleDeleteProducts(item._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {noProduct && (
            <div className="noProduct">
              <span>No Products Found</span>
            </div>
          )}
        </div>
        <ToastContainer/>
      </div>
    </>
  );
};

export default AdminProductList;
