import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios, { all } from 'axios';
import { IoStar } from "react-icons/io5";
import {Link, useLocation} from 'react-router-dom';


const UserProductList = ({setProduct}) => {
    const [products, setProducts] = useState([]);
    const [noProducts, setNoProducts] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortBy, setSortBy] = useState("");

    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get("search");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await axios.get("http://localhost:5000/api/products/getProducts");
                console.log("products fetched successfully!")
                const allProducts = fetchedProducts.data.products;
                setProducts(allProducts);
                setNoProducts(allProducts.length === 0);
            } catch (error) {
                console.error("Error occurred while getting products:", error);
            }
        }

        fetchProducts();

    }, [])

    useEffect(() => {
        const filtered = products.filter((product) => {
            const matchedProducts = searchQuery ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
            const matchedCategory = selectedCategory ? product.category.toLowerCase().includes(selectedCategory.toLowerCase()) : true;
            return matchedProducts && matchedCategory;
        })
        .sort((a,b) => {
            if(sortBy === "Price - ascending") return (a.price - b.price);
            else if(sortBy === "Price - descending") return (b.price - a.price);
            return 0;
        })
        setFilteredProducts(filtered);
        setNoProducts(filtered.length===0);
    }, [searchQuery,products,selectedCategory,sortBy]);

    return (
        <>
            <div className='user-mainContainer'>
                <Navbar />
                <div className='user-filterContainer'>
                <div className='user-filterDropdowns'>
                    <select
                        className="user-category"
                        value={selectedCategory}
                        onChange={(e) => {setSelectedCategory(e.target.value)}}
                    >
                        <option selected>Category</option>
                        <option value="Men's Clothing">Men's Clothing</option>
                        <option value="Women's Clothing">Women's Clothing</option>
                        <option value="Kid's Clothing">Kid's Clothing</option>
                        <option value="Footwear">Footwear</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Formal & Office Wear">Formal & Office Wear</option>
                        <option value="Traditional Wear">Traditional Wear</option>
                        <option value="Others">Others</option>
                    </select>

                    <select className="user-sortby"
                    value={sortBy}
                    onChange={(e) => {setSortBy(e.target.value)}}
                    >
                        <option value="" selected>Sort by</option>
                        <option value="Price - ascending">Price - ascending</option>
                        <option value="Price - descending">Price - descending</option>
                    </select>

                </div>
                <div className='searchResults'>
                    {searchQuery && <p>Search Results for : <span>{searchQuery}</span></p>}
                </div>
                </div>
                
                {noProducts &&<div className='noProductsContainer'>
                     <span className='noProducts'>No products Found</span>
                </div>}

                <div className='user-subContainer'>
                    {filteredProducts?.map((item, index) => (
                        <Link to='/userProductDetails' className='userProductDetails-link'>
                            <div key={index} className='product-container' onClick={() => {setProduct(item._id)}}>
                            {item.image ? (<img src={`http://localhost:5000/${item.image}`} alt="lava mobile" />) : (<span>Image not available.</span>)}
                            <div className='product-detailsContainer'>
                                <div className='product-title'>
                                <p>{item.name}</p>
                                </div>
                                <p className='product-price'>₹ {item.price}</p>
                                <div className='product-ratingsContainer'>
                                    <span className='product-ratings'>Ratings: {item.ratings}</span>
                                    <IoStar className='star-icon' />
                                </div>
                                <p className='product-category'>{item.category}</p>
                            </div>
                            <button className='product-detailsBtn'>View Details</button>
                        </div></Link>
                    ))
                    }

                </div>
            </div>
        </>
    )
}

export default UserProductList