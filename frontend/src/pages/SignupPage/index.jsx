import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthStore } from '../../store/useAuthStore';
import { Link } from 'react-router-dom';
import './index.css';



const SignupPage = () => {
  // const [username, setUsername] = useState('');
  // const [email, setEmail]       = useState('');
  // const [password, setPassword] = useState('');
  // const [role, setRole]         = useState('User');
  const [formData,setFormData] = useState({
    fullName:'',
    email:'',
    password:'',
    role:'User'
  })

  const {signup} = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) signup(formData)
    
    console.log(formData)

  };

  
  
  
  return (
    <div className="register-container">
      <img src = "https://res.cloudinary.com/dze7v0evj/image/upload/v1746790182/undraw_online-banking_l9sn_pbib3u.svg" className='register-img'/>
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className='form-heading'>Register</h2>

        <label htmlFor="username" className='label'> Full Name</label>
        <input
          id="username"
          type="text"
          placeholder="Enter full name"
          value={formData.fullName}
          className='input'
          onChange={(e)=>setFormData({...formData,fullName:e.target.value})}
          required
        />

        <label htmlFor="email" className='label'>Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter email"
          className='input'
          value={formData.email}
          onChange={(e)=>setFormData({...formData,email:e.target.value})}
          required
          
        />

        <label htmlFor="password" className='label'>Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter password"
           className='input'
          value={formData.password}
         onChange={(e)=>setFormData({...formData,password:e.target.value})}
          required
        />

        <label htmlFor="role" className='label'>Select Role</label>
        <select
          id="role"
          value={formData.role}
          className='select-options'
          
          onChange={(e)=>setFormData({...formData,role:e.target.value})}
          required
        >
          <option value="User"  className='options'>User</option>
          <option value="Admin" className='options'>Admin</option>
          <option value="Verifier" className='options'>Verifier</option>
        </select>

        <button type="submit">Register</button>
        <p className='login-link'>
          Already have an account? <Link to="/login" className='link'>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage