// src/services/api.js
import axios from 'axios';

const API_URL ="http://localhost:3000";

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

export const addStudent = async (fullName, usn, email, password) => {
    try {
        const response = await api.post('/admin/createStudent', { fullName, usn, email, password });
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

export const addSubject = async (adminId,subjectName, subjectCode, facultyName ,email ,password) => {
    try {
        const response = await api.post('/admin/createSubject', { adminId, subjectName, subjectCode, facultyName ,email, password});
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};
export const studentLogin = async (usn, password) => {
    try {
        const response = await api.post('/student/login', { usn, password });
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};
export const subjectLogin = async ( subjectCode, password) => {
    try {
        const response = await api.post('/subject/login', {subjectCode, password });
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};
// Fetch subjects for the student
export const getSubjects = async (studentId) => {
    try {
        const response = await api.get(`/student/${studentId}/subjects`);
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

// Fetch attendance for a specific subject for the student
export const getAttendance = async (studentId, subjectCode) => {
    try {
        const response = await api.get(`/student/${studentId}/attendance`, {
            params: { subjectCode }
        });
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

// Fetch marks for a specific subject for the student
export const getMarks = async (studentId, subjectCode) => {
    try {
        const response = await api.get(`/student/${studentId}/marks`, {
            params: { subjectCode }
        });
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
};

// Add other API calls as needed

// Add other API calls as needed
