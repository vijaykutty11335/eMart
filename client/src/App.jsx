import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Homepage from "./Components/Homepage";
import Navbar from './Components/Navbar';
import './index.css';
import AdminAddProducts from './Components/AdminAddProducts';
import AdminProductList from './Components/AminProductList';
import { useState } from 'react';

function App() {
  const [product, setProduct] = useState([]);

  const addProduct = (newProduct) =>{
    setProduct([...product, newProduct]);
  }

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/homepage' element={<Homepage/>}/>
        <Route path='/navbar' element={<Navbar/>}/>
        <Route path='/adminAddProducts' element={<AdminAddProducts addProduct={addProduct}/> }/>
        <Route path='/adminProductList' element={<AdminProductList product={product}/> }/>

      </Routes>
    </Router>
    </>
  )
}

export default App;
