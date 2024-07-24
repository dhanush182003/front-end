import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { subjectLogin } from '../../services/api'; // Adjust the import path as necessary
import './authcommon.css';

const FacultyLogin = () => {
    const [subjectCode, setSubjectCode] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await subjectLogin(subjectCode, subjectName);
            localStorage.setItem('token', response.token);
            navigate('/subject-dashboard');
        } catch (err) {
            setError('Login failed. Please check your subject code and name.');
        }
    };

    return (
        <div className="container">
            <h2>Faculty Login</h2>
            <form className="form" onSubmit={handleLogin}>
                <input
                    className="input"
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
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default FacultyLogin;
