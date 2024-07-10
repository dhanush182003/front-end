// src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Enable cookies if using sessions for authentication
});

export const registerAdmin = async (fullName, email, password) => {
    try {
        const response = await api.post('/admin/register', { fullName, email, password });
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

export const loginAdmin = async (email, password) => {
    try {
        const response = await api.post('/admin/login', { email, password });
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

export const addStudent = async (adminId, fullName, usn, email, password) => {
    try {
        const response = await api.post('/student/create', { adminId, fullName, usn, email, password });
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

export const addSubject = async (adminId, subjectName, subjectCode, facultyName) => {
    try {
        const response = await api.post('/subject/create', { adminId, subjectName, subjectCode, facultyName });
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

// Add other API calls as needed
