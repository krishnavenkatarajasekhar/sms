// TeacherList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TeacherList.css';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
      console.log("onload");
    // Fetch teachers data from the backend when the component mounts
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      // Make a fetch request to your backend API endpoint for teachers
      //const response = await fetch('http://localhost:8105/teachers'); // Replace with your actual API endpoint
      const response = await axios.get('http://localhost:8105/teachers');
      
      setTeachers(response.data); // Update state with the fetched teachers data
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  return (
    <div className="teacher-list">
      <h2>Teachers List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Experience</th>
            <th>Joining Date</th>
            <th>CTC</th>
            <th>Incharge of Class</th>
            <th>Address</th>
            <th>Email</th>
            <th>Qualification</th>
           
          
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.teacherId}>
              <td>{teacher.teacherId}</td>
              <td>{teacher.name}</td>
              <td>{teacher.experience}</td>
              <td>{teacher.joiningDate}</td>
              <td>{teacher.ctc}</td>
              <td>{teacher.inchargeOfClass}</td>
              <td>{teacher.address}</td>
              <td>{teacher.email}</td>
              <td>{teacher.qualification}</td>
              
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherList;
