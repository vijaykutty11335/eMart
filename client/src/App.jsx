import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Homepage from "./Components/Homepage";
import Navbar from './Components/Navbar';
import './index.css';
import AdminAddProducts from './Components/AdminAddProducts';
import AdminProductList from './Components/AminProductList';
import { useState } from 'react';
import AdminUserDetails from './Components/AdminUserDetails';

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
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/homepage' element={<Homepage/>}/>
        <Route path='/adminUserDetails' element={<AdminUserDetails/>}/>
        <Route path='/adminAddProducts' element={<AdminAddProducts product={product} onReset={hanldeProductReset}/> }/>
        <Route path='/adminProductList' element={<AdminProductList setProduct={setProduct}/> }/>

      </Routes>
    </Router>
    </>
  )
}

export default App;
