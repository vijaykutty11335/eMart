import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import HomePage from './Components/HomePage';
import Navbar from './Components/Navbar';
import './index.css';
import AdminAddProducts from './Components/AdminAddProducts';
import AdminProductList from './Components/AminProductList';
import { useState } from 'react';
import AdminUserDetails from './Components/AdminUserDetails';
import AboutUs from './Components/ContactUs';
import UserProductList from './Components/UserProductList';
import UserProductDetails from './Components/UserProductDetails';
import UserProfilePage from './Components/UserProfilepage';
import AdminDashBoard from './Components/AdminDashBoard';
import AddtoCart from './Components/AddtoCart';
import OrderPlacedPage from './Components/OrderPlacedPage';

function App() {
  const [product, setProduct] = useState();

  const [productId, setProductId] = useState();
  console.log("product Id:",productId);

  const [productIdCart, setProductIdCart] = useState();
  console.log("productId Cart", productIdCart);
  
  const hanldeProductReset = () => {
    setProduct(null);
  }

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/navbar' element={<Navbar/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/homepage' element={<HomePage/>}/>
        <Route path='/contactUs' element={<AboutUs/>}/>
        <Route path='/adminDashboard' element={<AdminDashBoard/>}/>
        <Route path='/adminUserDetails' element={<AdminUserDetails/>}/>
        <Route path='/adminAddProducts' element={<AdminAddProducts product={product} onReset={hanldeProductReset}/> }/>
        <Route path='/adminProductList' element={<AdminProductList setProduct={setProduct}/> }/>
        <Route path='/userProductList' element={<UserProductList setProductId={setProductId}/>}/>
        <Route path='/userProductDetails' element={<UserProductDetails productId={productId} setProductIdCart={setProductIdCart}/>}/>
        <Route path='/userProfilePage' element={<UserProfilePage/>}/>
        <Route path='/addtoCart' element={<AddtoCart productIdCart={productIdCart}/>}/>
        <Route path='/orderPlacedPage' element={<OrderPlacedPage/>}/>

      </Routes>
    </Router>
    </>
  )
}

export default App;
