import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './authcommon.css';

const FacultyLogin = () => {
    const [subjectCode, setSubjectCode] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/subjects/login', { subjectCode, subjectName });
            localStorage.setItem('token', response.data.token);
            navigate('/subject-dashboard');
        } catch (error) {
            setError('Login failed. Please check your subject code and name.');
        }
    };

    return (
        <div className="container">
            <h2>Faculty Login</h2>
            <form className="form" onSubmit={handleLogin}>
                <input className="input"
                    type="text"
                    placeholder="Subject Code"
                    value={subjectCode}
                    onChange={(e) => setSubjectCode(e.target.value)}
                />
                <input
                    className="input"
                    type="text"
                    placeholder="Subject Name"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                />
                <button className="button" type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default FacultyLogin;

