// StudentList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentList.css';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch students data from the backend when the component mounts
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      // Make a fetch request to your backend API endpoint for students
      const response =  await axios.get('http://localhost:8105/students/get'); // Replace with your actual API endpoint
      
      setStudents(response.data); // Update state with the fetched students data
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  return (
    <div className="student-list">
      <h2>Students List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Mother Name</th>
            <th>Father Name</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Class Name</th>
            <th>Section</th>
          
           
            
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentId}>
              <td>{student.studentId}</td>
              <td>{student.fullName}</td>
              <td>{student.motherName}</td>
              <td>{student.fatherName}</td>
              <td>{student.address}</td>
              <td>{student.contact}</td>
              <td>{student.email}</td>
              <td>{student.gender}</td>
              <td>{student.className}</td>
              <td>{student.section}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
