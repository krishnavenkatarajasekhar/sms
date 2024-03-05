import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import './TakeAttendance.css'; // Import your existing CSS

const TakeAttendance = ({ currentUser }) => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [date, setDate] = useState(new Date()); // Initialize with current date
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const classes = ['LKG', 'UKG', '1','2','3','4','5','6','7','8','9','X']; // Replace with actual data
  const sections = ['A', 'B', 'C']; // Replace with actual data


  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://localhost:8105/api/attendance/get-students?className=${selectedClass}&section=${selectedSection}&date=${date.toISOString()}`);
      setAttendance(response.data);
    } catch (error) {
      console.error('Error fetching students:', error.message);
    }
  };

  const handleSearchClick = () => {
    setIsSearchClicked(true);
    fetchStudents();
  };

  const submitAttendance = async () => {
    try {
      const response =  await axios.post('http://localhost:8105/api/attendance', attendance);
      setAttendance(response.data);
      alert('Attendance submitted successfully');
    } catch (error) {
      console.error('Error submitting attendance:', error.message);
      alert('Failed to submit attendance');
    }
  };


  const handleAttendanceChange = (student, option, ) => {
    setAttendance(prevAttendance => {
      // Find the index of the object in attendance array where studentId matches
      const studentIndex = prevAttendance.findIndex(item => item.studentId === student.studentId);

      if (studentIndex !== -1) {
        // If the student's attendance is found
        const updatedAttendance = [...prevAttendance]; // Create a copy of the array
        // Update parameters of the found object
        updatedAttendance[studentIndex] = {
          ...updatedAttendance[studentIndex], // Preserve other properties
          status: option,
          teacherEmail: currentUser.email,
          date: date.toISOString(), // Convert date to string if needed
        };
        return updatedAttendance; // Update attendance state with the modified array
      } else {
        // If the student's attendance is not found, add a new object to the array
        return [
          ...prevAttendance,
          {
            className: student.className,
            section: student.section,
            studentId: student.studentId,
            status: option,
            teacherEmail: currentUser.email,
            date: date.toISOString(), // Convert date to string if needed
            fullName: student.fullName // Add other necessary properties
          }
        ];
      }
    });
  };

  return (
    <div id="take-attend" className="container">
      <h1>Manual Attendance Tracking</h1>
      <label>Select Class:</label>
      <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
        <option value="">Select Class</option>
        {classes.map((className) => (
          <option key={className} value={className}>
            {className}
          </option>
        ))}
      </select>

      <label>Select Section:</label>
      <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
        <option value="">Select Section</option>
        {sections.map((section) => (
          <option key={section} value={section}>
            {section}
          </option>
        ))}
      </select>

      <label>Date:</label>
      <DatePicker
        selected={date}
        onChange={setDate}
        dateFormat="yyyy-MM-dd"
        placeholderText="Click to select a date"
        className="date-picker" // Add a class for styling
      />
      <div className="button-container">
        <button onClick={handleSearchClick}>Search</button>
      </div>
      {isSearchClicked && (
        <>
          <h2>Student List</h2>
          <table>
            <thead>
              <tr>
                <th rowSpan="2">Name</th>
                <th rowSpan="2">Class</th>
                <th rowSpan="2">Section</th>
                <th colSpan="2">Attendance</th> {/* Merge two columns for Attendance */}
              </tr>
              <tr>
                <th>Present</th>
                <th>Absent</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((student) => (
                <tr key={student.studentId}>
                  <td>{student.fullName}</td>
                  <td>{student.className}</td>
                  <td>{student.section}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={student.status === 'present'}
                      onChange={() => handleAttendanceChange(student, 'present')}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={student.status === 'absent'}
                      onChange={() => handleAttendanceChange(student, 'absent')}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="button-container">
            <button onClick={submitAttendance}>Submit Attendance</button>
          </div>
        </>
      )}
    </div>
  );

};

export default TakeAttendance;
