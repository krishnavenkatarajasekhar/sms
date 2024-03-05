import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Viewattendance.css'; // Import the CSS file

function Viewattendance({ currentUser }) {
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAttendanceData();
    }, []);

    const fetchAttendanceData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8105/api/attendance/students/11');
            setAttendanceData(response.data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching attendance data');
            setLoading(false);
        }
    };

    return (
        <div id='view-attend-form' className="attendance-container">
            <h2>Attendance Data</h2>
            {loading && <p>Loading attendance data...</p>}
            {error && <p>{error}</p>}
            <table className="attendance-table">
                <thead>
                    <tr>
                        {/* <th>Class Name</th>
                        <th>Section</th> */}
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceData.map((attendanceEntry, index) => (
                        <tr key={index} className="attendance-row">
                            {/* <td>{attendanceEntry.className}</td>
                            <td>{attendanceEntry.section}</td> */}
                            <td>{attendanceEntry.date}</td>
                            <td>{attendanceEntry.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Viewattendance;

