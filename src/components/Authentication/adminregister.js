// src/components/Auth/AdminRegister.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './authcommon.css';
const AdminRegister = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/register', { fullName, email, password });
      navigate('/admin-login');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className="container">
      <h2>Admin Register</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input className="input" type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="button"  type="submit">Register</button>
      </form>
    </div>
  );
};

export default AdminRegister;
