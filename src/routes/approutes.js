// src/routes/AppRoutes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../components/home';
import AdminDashboard from '../components/admindashboard';
import AdminLogin from '../components/Authentication/adminlogin';
import AdminRegister from '../components/Authentication/adminregister';
import FacultyLogin from '../components/Authentication/facultylogin';
import StudentLogin from '../components/Authentication/studentlogin';
import SubjectDashboard from '../components/subjectdashboard';
import StudentDashboard from '../components/studentdashboard';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/faculty-login" element={<FacultyLogin />} />
        <Route path="/subject-dashboard" element={<SubjectDashboard />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
