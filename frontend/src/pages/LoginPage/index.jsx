import React, { useState } from 'react'

import { useAuthStore } from '../../store/useAuthStore';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {Link} from 'react-router-dom'

import "./login.css"

const LoginPage = () => {

  const {login} = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',


  })

  const handleLogin = async (e) => {
    e.preventDefault()
    login(formData)
  }


  return (
    <div className="login-container">
     
      <form onSubmit={handleLogin} className="login-form">
         <img src="https://res.cloudinary.com/dze7v0evj/image/upload/v1746809049/credit_image_edited_yin53c.png" className='credit-logo'/>
        <div className="form-group1">
          <label htmlFor="email" className='label'>Email</label>
          <input
            type="email"
            id="email"
            className='input'
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e)=>setFormData({...formData,email:e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className='label'>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              className='password-input'
              onChange={(e)=>setFormData({...formData,password:e.target.value})}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="eye-btn"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type="submit" className="login-btn-login-page">Login</button>
        <p className="signup-link">
          Don't have an account? <Link to="/signup" className='link'>Sign Up</Link>
        </p>
        </div>

        
      </form>
    </div>
  );
}

export default LoginPage