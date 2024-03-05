import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RequestPage.css';

const RequestPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8105/teacher-requests/get');
      setRequests(response.data);
    } catch (error) {
      setError('Error fetching requests');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveReject = async (id, status) => {
    try {
      // Fetch the existing request details from the backend
      const response = await axios.get(`http://localhost:8105/teacher-requests/${id}`);
      const existingRequest = response.data;
  
      // Construct the updated request object with existing title, description, and updated status
      const updatedRequest = {
        ...existingRequest,
        status: status
      };
      
      // Send the updated request to the backend
      await axios.put(`http://localhost:8105/teacher-requests/${id}`, updatedRequest);
      
      // Fetch the updated requests after approval or rejection
      fetchRequests(); 
    } catch (error) {
      setError(`Error ${status.toLowerCase()}ing request`);
    }
  };
  
  
  return (
    <div className="request-page-container">
      <h1>Teacher Request Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="request-table">
          <thead className="table-header">
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="table-row">
                <td className="table-data">{request.name}</td>
                <td className="table-data">{request.title}</td>
                <td className="table-data">{request.description}</td>
                <td className="table-data">{request.status}</td>
                <td className="table-data">
                  <button
                    className="approve-button"
                    onClick={() => handleApproveReject(request.id, 'APPROVED')}
                  >
                    Approve
                  </button>
                  <button
                    className="cancel-button"
                    onClick={() => handleApproveReject(request.id, 'REJECTED')}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RequestPage;
