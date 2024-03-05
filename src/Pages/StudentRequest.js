import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentRequest.css';

const StudentRequest = ({ currentUser }) => {
 
  const [formData, setFormData] = useState({
    sendTo: '',
    title: '',
    description: ''

  });

  const [successMessage, setSuccessMessage] = useState('');
  const [requests, setRequests] = useState([]);
  const [approvalStatus, setApprovalStatus] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    let isValid = true;
  
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }
    if (!formData.sendTo.trim()) {
      newErrors.sendTo = 'Send to is required';
      isValid = false;
    }
   
  
    if (!isValid) {
      setErrors(newErrors);
      return;
    }
  
    try {
      if (!currentUser || !currentUser.id) {
        console.error('Error: loggedInUser or loggedInUser.id is not defined.');
        return;
      }
  
      const requestEntity = {
        title: formData.title,
        description: formData.description,
        userId: currentUser.id,
        
      };
  
      const response = await axios.post('http://localhost:8105/api-requests', requestEntity);
      if (response.status === 200 || response.status === 201) {
        const requestData = response.data; 
        if (requestData.approved) {
          setApprovalStatus('approved');
          setSuccessMessage('Request sent successfully and approved.');
        } else {
          setApprovalStatus('not-approved');
          setSuccessMessage('Request sent successfully but not yet approved.');
        }
        setFormData({
          sendTo: '',
          title: '',
          description: ''
          
        });
        setErrors({});
      } else {
        console.error('Error creating request. Status:', response.status);
      }
    } catch (error) {
      console.error('Error creating request:', error);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8105/api-requests/get');
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  return (
    <div className="request-form" id='student-request-form'>
      <h2>Requests</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          {errors.description && <span className="error">{errors.description}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="sendTo">Send to:</label>
          <select
            id="sendTo"
            name="sendTo"
            value={formData.sendTo}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
          {errors.sendTo && <span className="error">{errors.sendTo}</span>}
        </div>
        {/* <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </div> */}
        <button type="submit">Submit</button>
      </form>
      {successMessage && <div className={`success ${approvalStatus}`}>{successMessage}</div>}
      <div className="request-list">
        <h3>Recent Requests</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
           
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={index}>
                <td>{request.title}</td>
                <td>{request.description}</td>
                <td>{request.status}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentRequest;
