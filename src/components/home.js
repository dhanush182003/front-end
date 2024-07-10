// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css';
const Home = () => {
  return (
    <div className="container">
      <h1>Welcome to Student Management System</h1>
      <div className="options">
        <Link to="/admin-register">Admin Register </Link>
        <Link to="/admin-login">Admin Login </Link>
        <Link to="/faculty-login">Subject  </Link>
        <Link to="/student-login">Student </Link>
      </div>
    </div>
  );
};

export default Home;
