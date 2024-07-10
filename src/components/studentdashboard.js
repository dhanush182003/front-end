// src/components/StudentDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/studentdashboard.css';
const StudentDashboard = () => {
  const [attendance, setAttendance] = useState([]);
  const [marks, setMarks] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const token = localStorage.getItem('studentToken');
        const response = await axios.get('/api/student/attendance', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAttendance(response.data);
      } catch (error) {
        setMessage('Error fetching attendance');
      }
    };

    const fetchMarks = async () => {
      try {
        const token = localStorage.getItem('studentToken');
        const response = await axios.get('/api/student/marks', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMarks(response.data);
      } catch (error) {
        setMessage('Error fetching marks');
      }
    };

    fetchAttendance();
    fetchMarks();
  }, []);

  return (
    <div className="container">
      <h2>Student Dashboard</h2>
      {message && <p>{message}</p>}
      <div className="section">
        <h3>Attendance</h3>
        <ul>
          {attendance.map((att, index) => (
            <li key={index}>{att.date}: {att.status}</li>
          ))}
        </ul>
      </div>
      <div className="section">
        <h3>Marks</h3>
        <ul>
          {marks.map((mark, index) => (
            <li key={index}>{mark.subjectName}: {mark.marks}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;