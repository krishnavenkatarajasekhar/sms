import React, { useState } from 'react';
import axios from 'axios';
import './StudentAnnouncement.css';

const StudentAnnouncement = () => {
  const initialDescription = "This is the description text that you want to display.";

  // State to manage the description, view-only mode, and current date/time
  const [description, setDescription] = useState(initialDescription);
  const [viewOnly, setViewOnly] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const toggleEditMode = () => {
    setViewOnly(!viewOnly);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const saveAnnouncement = () => {
    // Example data to send to the backend
    const announcementData = {
      accouncementDateTime: currentDateTime,
      category: 'example_category',
      title: 'example_title',
      description: description
    };

    axios.post('http://localhost:8105/announcements/get', announcementData)
      .then(response => {
        console.log('Announcement saved successfully!', response.data);
      })
      .catch(error => {
        console.error('Error saving announcement:', error.response.data);
        // Handle error states or display error messages to the user
      });
  };

  return (
    <div id='student-announce'>
      <h1>Announcement</h1>

      <p>Current Date/Time: {currentDateTime.toLocaleString()}</p>

      {viewOnly ? (
        <p>{description}</p>
      ) : (
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          rows={4}
          cols={50}
        />
      )}

      <button onClick={toggleEditMode}>
        {viewOnly ? 'Edit' : 'Save'}
      </button>

      {!viewOnly && (
        <button onClick={saveAnnouncement}>Save Announcement</button>
      )}
    </div>
  );
};

export default StudentAnnouncement;
