import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewTask.css';

const ViewTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8105/api/sub');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <div id="Task-form" className="request-page-container">
      <h1>View Task</h1>
      <table className="request-table">
        <thead>
          <tr className="table-header1">
            <th className="table-data">Date</th>
            <th className="table-data">Class</th>
            <th className="table-data">Section</th>
            <th className="table-data">Subject</th>
            <th className="table-data">Student Name</th>
            <th className="table-data">Type</th>
            <th className="table-data">Start Date</th>
            <th className="table-data">End Date</th>
            <th className="table-data">Description</th>
           
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="table-data">{task.date}</td>
              <td className="table-data">{task.classes}</td>
              <td className="table-data">{task.section}</td>
              <td className="table-data">{task.subject}</td>
              <td className="table-data">{task.studentName}</td>
              <td className="table-data">{task.workType}</td>
              <td className="table-data">{task.startDate}</td>
              <td className="table-data">{task.endDate}</td>
              <td className="table-data">{task.description}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTask;
