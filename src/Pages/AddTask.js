import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AddTask.css';
import axios from 'axios';

const AddTask = () => {
  const [formData, setFormData] = useState({
    date: new Date(),
    subject:'',
    type: '',
    className: '',
    section: '',
    startDate: new Date(),
    endDate: new Date(),
    description: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8105/tasks/post', formData);
      setSuccessMessage('Task added successfully');
      setErrorMessage('');
      console.log('Task added successfully:', response.data);
      // Optionally, you can redirect the user or perform any other action after successful submission
    } catch (error) {
      setErrorMessage('Error adding task. Please try again.');
      setSuccessMessage('');
      console.error('Error adding task:', error);
    }
  };

  return (
    <div id="Add-Task" className="request-page-container">
      <h1>Add Task</h1>
      <div className="success-message">{successMessage}</div>
      <div className="error-message">{errorMessage}</div>
      <table className="request-table">
        <thead>
          <tr className="table-header1">
            <th className="table-data">Date</th>
            <th className="table-data">Type</th>
            <th className="table-data">Class</th>
            <th className="table-data">Section</th>
            <th className="table-data">Start Date</th>
            <th className="table-data">End Date</th>
            <th className="table-data">Subject</th>
            <th className="table-data">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-row">
            <td className="table-data">
              <DatePicker selected={formData.date} onChange={(date) => setFormData({ ...formData, date })} dateFormat="yyyy-MM-dd" />
            </td>
            <td className="table-data">
              <input type="text" name="type" value={formData.type} onChange={handleChange} />
            </td>
            <td className="table-data">
              <select name="className" value={formData.className} onChange={handleChange}>
                <option value="">Select Class</option>
                <option value="Nursery">Nursery</option>
                <option value="LKG">LKG</option>
                <option value="UKG">UKG</option>
                <option value="First">First</option>
                <option value="Second">Second</option>
                <option value="Third">Third</option>
                <option value="Fourth">Fourth</option>
                <option value="Fifth">Fifth</option>
                <option value="Sixth">Sixth</option>
                <option value="Seventh">Seventh</option>
                <option value="Eight">Eight</option>
                <option value="Ninth">Ninth</option>
                <option value="Tenth">Tenth</option>
              </select>
            </td>
            <td className="table-data">
              <select name="section" value={formData.section} onChange={handleChange}>
                <option value="">Select Section</option>
                <option value="a">Section A</option>
                <option value="b">Section B</option>
                <option value="c">Section C</option>
              </select>
            </td>
            <td className="table-data">
              <DatePicker selected={formData.startDate} onChange={(date) => setFormData({ ...formData, startDate: date })} dateFormat="yyyy-MM-dd" />
            </td>
            <td className="table-data">
              <DatePicker selected={formData.endDate} onChange={(date) => setFormData({ ...formData, endDate: date })} dateFormat="yyyy-MM-dd" />
            </td>
            <td className="table-data">
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
            </td>
            <td className="table-data">
              <input type="text" name="description" value={formData.description} onChange={handleChange} />
            </td>
          </tr>
        </tbody>
      </table>
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddTask;
