// RequestPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewAnnouncement.css'; 

const ViewAnnouncement = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8105/announcements/get');
      setRequests(response.data);
    } catch (error) {
      setError('Error fetching requests');
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="view-announce-container" id='view-announcement'>
      <h1> Announcements</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="view-announce-table">
          <thead className="table-announce">
            <tr>
              
              <th>Title</th>
              <th>Description</th>
              
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={index} className="table-row-announce">
                
                <td className="table-data">{request.title}</td>
                <td className="table-data">{request.description}</td>
                
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewAnnouncement;
