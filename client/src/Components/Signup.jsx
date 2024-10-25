import React, { useState } from 'react'
import {ToastContainer, toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
    const [formData, setFormData] = useState({username: "", email: "", password: "", confirmPassword: ""});
    const [error, setError] = useState("");
    const[loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(formData.password != formData.confirmPassword){
            setError("Password and Confirm Password Mismatched");
            return;
        }

        if(formData.password.length < 6){
            setError("Password must be contains atleast 6 characters");
            return;
        }
        setError("");
        setLoading(true);

        try{
            await axios.post("http://localhost:5000/api/auth/signup", formData);
            toast.success("Register Successfully!");
            setTimeout(() => {
                navigate('/login')
            }, 3000);

        } catch(error){
            setError(error.response?.data?.message || "An error occurred");
        } finally{
            setLoading(false);
        }
    }

    return (
        <>
            <div className='mainContainer'>
                <form className='signup-form'  onSubmit={handleSubmit}>
                    <div className='signup-header'>
                    <h2>Signup</h2>
                    {error && <span className='error-msg'>{error}</span>}
                    </div>
                    <div className='fields'>
                        <label htmlFor="username">Username :</label>
                        <input type='text' name="username" placeholder='Username' value={formData.username} onChange={handleChange} required/>
                        <label htmlFor="email">Email :</label>
                        <input type="email" name ="email" placeholder='Email' value={formData.email} onChange={handleChange} required/>
                        <label htmlFor="password">Password :</label>
                        <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} required/>
                        <label htmlFor="password">Confirm Password :</label>
                        <input type="password" name="confirmPassword" placeholder='Confirm Password' value={formData.confirmPassword} onChange={handleChange} required/>
                        <div/>
                    </div>
                    <div className='signup-authBtn'>
                            <button type="submit" className='auth-btn' disabled={loading}>{loading ? 'Signing up...' : 'Signup'}</button>
                            <span>Already have an account? <Link to = "/login">Login</Link></span>
                        </div>
                    
                    <ToastContainer/>
                </form>
            </div>
        </>
    )
}
