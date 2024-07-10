import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './authcommon.css';
const StudentLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/students/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/student-dashboard');
        } catch (error) {
            setError('Login failed. Please check your email and password.');
        }
    };

    return (
        <div className="container">
            <h2>Student Login</h2>
            <form className="form" onSubmit={handleLogin}>
                <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className="button" type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default StudentLogin;
