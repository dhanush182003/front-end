import React, { useState } from 'react';
import { addStudent,addSubject } from '../services/api'; // Adjust the import path as necessary
import '../css/admindashboard.css';

const AdminDashboard = () => {
  const [student, setStudent] = useState({ fullName: '', usn: '', email: '', password: '' });
  const [subject, setSubject] = useState({ subjectName: '', subjectCode: '', facultyName: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(null);  // Initialize showForm and setShowForm
  const [announcement, setAnnouncement] = useState('Welcome to the Admin Dashboard');

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminId = localStorage.getItem('adminToken');
      await addStudent(adminId, student.fullName, student.usn, student.email, student.password);
      setAnnouncement('Student added successfully');
    } catch (error) {
      setMessage('Error adding student');
    }
  };

  const handleSubjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminId = localStorage.getItem('adminToken');
      await addSubject(adminId, subject.subjectName, subject.subjectCode, subject.facultyName);
      setAnnouncement('Subject added successfully');
    } catch (error) {
      setMessage('Error adding subject');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    // Implement redirect to login if necessary
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="announcement">
        <p>{announcement}</p>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-block" onClick={() => setShowForm('student')}>
          <h3>Add Student</h3>
        </div>
        <div className="dashboard-block" onClick={() => setShowForm('subject')}>
          <h3>Add Subject</h3>
        </div>
      </div>
      {showForm === 'student' && (
        <div className="form-container">
          <h3>Add Student</h3>
          <form className="form" onSubmit={handleStudentSubmit}>
            <input className="input" type="text" placeholder="Full Name" value={student.fullName} onChange={(e) => setStudent({ ...student, fullName: e.target.value })} />
            <input className="input" type="text" placeholder="USN" value={student.usn} onChange={(e) => setStudent({ ...student, usn: e.target.value })} />
            <input className="input" type="email" placeholder="Email" value={student.email} onChange={(e) => setStudent({ ...student, email: e.target.value })} />
            <input className="input" type="password" placeholder="Password" value={student.password} onChange={(e) => setStudent({ ...student, password: e.target.value })} />
            <button className="button" type="submit">Add Student</button>
          </form>
        </div>
      )}
      {showForm === 'subject' && (
        <div className="form-container">
          <h3>Add Subject</h3>
          <form className="form" onSubmit={handleSubjectSubmit}>
            <input className="input" type="text" placeholder="Subject Name" value={subject.subjectName} onChange={(e) => setSubject({ ...subject, subjectName: e.target.value })} />
            <input className="input" type="text" placeholder="Subject Code" value={subject.subjectCode} onChange={(e) => setSubject({ ...subject, subjectCode: e.target.value })} />
            <input className="input" type="text" placeholder="Faculty Name" value={subject.facultyName} onChange={(e) => setSubject({ ...subject, facultyName: e.target.value })} />
            <input className="input" type="email" placeholder="Email" value={subject.email} onChange={(e) => setSubject({ ...subject, email: e.target.value })} />
            <input className="input" type="password" placeholder="Password" value={subject.password} onChange={(e) => setSubject({ ...subject, password: e.target.value })} />
            <button className="button" type="submit">Add Subject</button>
          </form>
        </div>
      )}
      <button className="button" onClick={handleLogout}>Logout</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AdminDashboard;