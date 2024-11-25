import { useState } from 'react';
import axios from 'axios';
import { useNavigate , Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      const token = res.data.token;
      localStorage.setItem("token",token);
      console.log("token",token);
      toast.success("Login Successfully!");
      setTimeout(() => {
        navigate('/homepage');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }finally{
      setLoading(false);
    }
  };

  return (
    <>
    <div className='mainContainer'>
    <div className='img-Container'>
                    <img src="./Fashions/signup-bg.jpg" alt="signup-bg" />
                </div>
        <form className='login-form'  onSubmit={handleSubmit}>
            <div className='login-header'>
            <h2>Login</h2>
            {error && <span className='error-msg'>{error}</span>}
            </div>
            <div className='fields'>
                <label htmlFor="email">Email :</label>
                <input type="email" name ="email" placeholder='Email' value={formData.email} onChange={handleChange} required/>
                <label htmlFor="password">Password :</label>
                <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} required/>
                <div/>
            </div>
            <div className='login-authBtn'>
                    <button type="submit" className='auth-btn' disabled={loading}>{loading ? 'Logingin...' : 'Login'}</button>
                    <span>New User? <Link to = "/signup">Signup</Link></span>
            </div>
            <ToastContainer/>
        </form>
    </div>
</>
  );
}

export default Login;
