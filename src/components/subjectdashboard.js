// src/components/SubjectDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/subjectdashboard.css';
const SubjectDashboard = () => {
  const [attendance, setAttendance] = useState([]);
  const [marks, setMarks] = useState([]);
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(()=>{
    // Fetch students added by admin
    const fetchStudents = async() => {
      try {
        const token = localStorage.getItem('facultyToken');
        const response = await axios.get('/api/faculty/students', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudents(response.data);
      } catch (error) {
        setMessage('Error fetching students');
      }
    };
    fetchStudents();
  }, []);

  const handleAttendanceSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('facultyToken');
      await axios.post('/api/faculty/attendance', { attendance }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Attendance added successfully');
    } catch (error) {
      setMessage('Error adding attendance');
    }
  };

  const handleMarksSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('facultyToken');
      await axios.post('/api/faculty/marks', { marks }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Marks added successfully');
    } catch (error) {
      setMessage('Error adding marks');
    }
  };

  return (
    <div className="container">
      <h2>Subject Dashboard</h2>
      <div classname="section">
        <h3>Add Attendance</h3>
        <form classname="form" onSubmit={handleAttendanceSubmit}>
          {students.map(student => (
            <div key={student.id}>
              <label>{student.fullName}</label>
              <input  type="checkbox" onChange={(e) => setAttendance([...attendance, { studentId: student.id, status: e.target.checked }])} />
            </div>
          ))}
          <button className="button" type="submit">Submit Attendance</button>
        </form>
      </div>
      <div>
        <h3>Add Marks</h3>
        <form className="form" onSubmit={handleMarksSubmit}>
          {students.map(student => (
            <div key={student.id}>
              <label>{student.fullName}</label>
              <input className="input" type="number" onChange={(e) => setMarks([...marks, { studentId: student.id, marks: e.target.value }])} />
            </div>
          ))}
          <button className="button" type="submit">Submit Marks</button>
        </form>
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default SubjectDashboard;
