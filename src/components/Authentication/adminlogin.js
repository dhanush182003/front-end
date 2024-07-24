import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { loginAdmin } from '../../services/api'; // Adjust the import path as necessary
import './authcommon.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAdmin(email, password);
      localStorage.setItem('adminToken', response.token);
      navigate('/admin-dashboard');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="container">
      <h2>Admin Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button" type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
      <Link to="/admin-register">Register as Admin</Link>
    </div>
  );
};

export default AdminLogin;
