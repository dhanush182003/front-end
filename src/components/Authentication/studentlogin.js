import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentLogin } from '../../services/api'; // Adjust the import path as necessary
import './authcommon.css';

const StudentLogin = () => {
    const [usn, setUsn] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await studentLogin(usn, password);
            localStorage.setItem('token', response.token);
            navigate('/student-dashboard');
        } catch (err) {
            setError('Login failed. Please check your USN and password.');
        }
    };

    return (
        <div className="container">
            <h2>Student Login</h2>
            <form className="form" onSubmit={handleLogin}>
                <input
                    className="input"
                    type="text"
                    placeholder="USN"
                    value={usn}
                    onChange={(e) => setUsn(e.target.value)}
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
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default StudentLogin;
