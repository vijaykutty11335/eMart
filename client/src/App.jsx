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

function App() {
  const [product, setProduct] = useState();
  console.log(product);

  const hanldeProductReset = () => {
    setProduct(null);
  }

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/navbar' element={<Navbar/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/homepage' element={<HomePage/>}/>
        <Route path='/contactUs' element={<AboutUs/>}/>
        <Route path='/adminUserDetails' element={<AdminUserDetails/>}/>
        <Route path='/adminAddProducts' element={<AdminAddProducts product={product} onReset={hanldeProductReset}/> }/>
        <Route path='/adminProductList' element={<AdminProductList setProduct={setProduct}/> }/>

      </Routes>
    </Router>
    </>
  )
}

export default App;
