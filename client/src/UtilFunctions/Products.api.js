import axios from "axios";

let allProducts = [];

const fetchProducts = async () => {
    try {
        const fetchedProducts = await axios.get("http://localhost:5000/api/products/getProducts");
        allProducts = fetchedProducts.data.products;
    } catch (error) {
      console.error("Error occurred while getting products:", error);
    }
};

export {fetchProducts, allProducts};