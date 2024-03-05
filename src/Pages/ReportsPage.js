import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReportsPage = () => {
  const [data, setData] = useState({
    class: '',
    section: '',
  });

  const [reports, setReports] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    // Fetch reports when the component mounts
    fetchReports();
  }, []);

  const handleChange = (fieldName, value) => {
    setData({ ...data, [fieldName]: value });
  };

  const handleSectionChange = (e) => {
    setData({ ...data, section: e.target.value });
  };

  const fetchReports = async () => {
    try {
      // Assuming your backend API endpoint for fetching reports is '/api/reports'
      const response = await axios.get(`/api/reports?class=${data.class}&section=${data.section}`);
      // Update state with the fetched reports
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const handleViewClick = async () => {
    fetchReports();
  };

  const handleEditClick = async () => {
    try {
      // Assuming your backend API endpoint for editing reports is '/api/edit'
      const response = await axios.put(`/api/edit`, { class: data.class, section: data.section });
      // Handle the response (e.g., show a success message)
      console.log(response.data);
      // Fetch updated reports after editing
      fetchReports();
      setEditing(false);
    } catch (error) {
      console.error('Error editing reports:', error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      // Assuming your backend API endpoint for deleting reports is '/api/delete'
      const response = await axios.delete(`/api/delete?class=${data.class}&section=${data.section}`);
      // Handle the response (e.g., show a success message)
      console.log(response.data);
      // Fetch updated reports after deletion
      fetchReports();
    } catch (error) {
      console.error('Error deleting reports:', error);
    }
  };

  return (
    <div className="reports-page-container" id='report-form'>
      <h1>Reports Page</h1>
      <table className="reports-table">
        <thead>
          <tr className="table-header">
            <th className="table-heading">Name</th>
            <th className="table-heading">Class</th>
            <th className="table-heading">Section</th>
            <th className="table-heading">Reports</th>
            <th className="table-heading">Options</th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-row">
            <td className="table-data">
              <select
                className="class-dropdown"
                value={data.class}
                onChange={(e) => handleChange('class', e.target.value)}
              >
                <option value="">Select Class</option>
                <option value="LKG">LKG</option>
                <option value="UKG">UKG</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </td>
            <td className="table-data">
              <select
                className="select-dropdown"
                value={data.section}
                onChange={handleSectionChange}
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                { /* Add more sections if needed */ }
              </select>
            </td>
            <td className="table-data">
              <button className="option-button" onClick={handleViewClick}>View</button>
            </td>
            <td className="table-data">
              <button className="option-button" onClick={handleEditClick}>Edit</button>
              <button className="option-button" onClick={handleDeleteClick}>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReportsPage;
