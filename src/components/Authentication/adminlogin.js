// src/components/Auth/AdminLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './authcommon.css';
const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/admin/login', { email, password });
      localStorage.setItem('adminToken', response.data.token);
      navigate('/admin-dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="container">
      <h2>Admin Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="button" type="submit">Login</button>
      </form>
      <Link to="/admin-register">Register as Admin</Link>
    </div>
  );
};

export default AdminLogin;
