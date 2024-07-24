// src/components/StudentDashboard.js
import React, { useState, useEffect } from 'react';
import { getSubjects, getAttendance, getMarks } from '../services/api';
import '../css/studentdashboard.css';

const StudentDashboard = () => {
  const [view, setView] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [attendance, setAttendance] = useState(null);
  const [marks, setMarks] = useState(null);

  useEffect(() => {
    if (view === 'attendance' || view === 'marks') {
      const fetchSubjects = async () => {
        try {
          const studentId = localStorage.getItem('studentId');
          const response = await getSubjects(studentId);
          setSubjects(response);
        } catch (error) {
          console.error('Error fetching subjects', error);
        }
      };
      fetchSubjects();
    }
  }, [view]);

  const handleSubjectChange = async (event) => {
    const subjectCode = event.target.value;
    setSelectedSubject(subjectCode);

    try {
      const studentId = localStorage.getItem('studentId');
      if (view === 'attendance') {
        const response = await getAttendance(studentId, subjectCode);
        setAttendance(response);
      } else if (view === 'marks') {
        const response = await getMarks(studentId, subjectCode);
        setMarks(response);
      }
    } catch (error) {
      console.error(`Error fetching ${view}`, error);
    }
  };

  return (
    <div className="container">
      <h2>Student Dashboard</h2>
      {view === '' && (
        <div className="options">
          <div className="option" onClick={() => setView('attendance')}>View Attendance</div>
          <div className="option" onClick={() => setView('marks')}>View Marks</div>
        </div>
      )}
      {view === 'attendance' && (
        <div className="attendance-container">
          <h3>View Attendance</h3>
          <div className="form-group">
            <label htmlFor="subject-select">Select Subject:</label>
            <select id="subject-select" value={selectedSubject} onChange={handleSubjectChange}>
              <option value="">Select a subject</option>
              {subjects.map(subject => (
                <option key={subject.subjectCode} value={subject.subjectCode}>
                  {subject.subjectName}
                </option>
              ))}
            </select>
          </div>
          {attendance !== null && (
            <div className="attendance">
              <h3>Attendance for {selectedSubject}</h3>
              <p>{attendance.percentage}%</p>
            </div>
          )}
        </div>
      )}
      {view === 'marks' && (
        <div className="marks-container">
          <h3>View Marks</h3>
          <div className="form-group">
            <label htmlFor="subject-select">Select Subject:</label>
            <select id="subject-select" value={selectedSubject} onChange={handleSubjectChange}>
              <option value="">Select a subject</option>
              {subjects.map(subject => (
                <option key={subject.subjectCode} value={subject.subjectCode}>
                  {subject.subjectName}
                </option>
              ))}
            </select>
          </div>
          {marks !== null && (
            <div className="marks">
              <h3>Marks for {selectedSubject}</h3>
              <p>{marks.score}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
