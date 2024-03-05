// RequestPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RequestPage.css';
import { FaCheck, FaTimes } from 'react-icons/fa';



const RequestPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8105/api-requests/get');
      setRequests(response.data);
    } catch (error) {
      setError('Error fetching requests');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveReject = async (id, status) => {
    try {
      const selectedRow = requests.find((row) => row.id === id);
      selectedRow.status = status;

      await axios.put(`http://localhost:8105/api-requests/${id}`, selectedRow);
      fetchRequests(); // Update the requests after approval or rejection
    } catch (error) {
      setError(`Error ${status.toLowerCase()}ing request`);
    }
  };

  return (
    <div className="request-page-container">
      <h1>Request Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
            <table className="request-table">
              <thead className="table-header">
                <tr>
                  <th>Name</th>
                  <th>className</th>
                  <th>Section</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request, index) => (
                  <tr key={index} className="table-row">
                    <td className="table-data">{request.name}</td>
                    <td className="table-data">{request.className}</td>
                    <td className="table-data">{request.section}</td>
                    <td className="table-data">{request.title}</td>
                    <td className="table-data">{request.description}</td>
                    <td className="table-data">{request.status}</td>
                    <td className="table-data">
                    <div style={{ display: 'flex' }}> 
                      <button className="approve-button"
                        onClick={() => handleApproveReject(request.id, 'APPROVED')}
                        style={{ marginRight: '5px', padding: '8px', width: '100px' }}  >
                        <FaCheck style={{ marginRight: '0px' }} />
                      </button>
                      <button className="cancel-button"
                        onClick={() => handleApproveReject(request.id, 'REJECTED')}
                        style={{ padding: '8px', width: '100px', height: '44px' }} >
                        <FaTimes style={{ marginRight: '0px' }} />
                      </button>
                      </div>
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
