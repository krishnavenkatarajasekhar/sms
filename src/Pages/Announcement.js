import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Announcement.css";

function Announce() {
  const [announcement, setAnnouncement] = useState({
    title: "",
    category: "",
    description: "",
  });
  const [errorMessages, setErrorMessages] = useState({});
  const history = useHistory();

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();

  const handleChange = (e) => {
    setAnnouncement({
      ...announcement,
      [e.target.name]: e.target.value,
    });
    setErrorMessages({
      ...errorMessages,
      [e.target.name]: "", 
    });
  };

  const handleTitleBlur = (e) => {
    const titleValue = e.target.value;
    if (!/^[a-zA-Z\s]*$/.test(titleValue)) {
      setErrorMessages({
        ...errorMessages,
        [e.target.name]: "Title should contain only letters",
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!announcement.title.trim()) {
      errors.title = "Title is required";
    } else if (announcement.title.length < 3) {
      errors.title = "Title must be at least 3 characters";
    }

    if (!announcement.category) {
      errors.category = "Category is required";
    }

    if (!announcement.description.trim()) {
      errors.description = "Description is required";
    } else if (announcement.description.length < 20) {
      errors.description = "Description must be at least 20 characters";
    }

    setErrorMessages(errors);

    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const submitAnnouncement = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:8105/announcements/create", {
        ...announcement,
        date: formattedDate,
        time: formattedTime,
      });

      console.log('Server response:', response.data);

      if (response.data === "Announcement created successfully") {
        alert('Announcement created successfully!');
        //history.push("/success");
      } else {
        alert(`Announcement creation failed: ${response.data}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  return (
    <div className="main" id="announcement">
      <h1 className="Announcement-heading">Announcement</h1>
      <div className="date-time">{formattedDate} - {formattedTime}</div>
      <form onSubmit={submitAnnouncement} className="announcement-form">
        <div className="row mb-3">
          <label htmlFor="title" className="col-sm-4 col-form-label">
            Title:
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              id="title"
              name="title"
              value={announcement.title}
              onChange={handleChange}
              onBlur={handleTitleBlur}
              className={`form-control ${errorMessages.title ? "is-invalid" : ""}`}
            />
            {errorMessages.title && (
              <div className="invalid-feedback" style={{ color: 'red' }}>{errorMessages.title}</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="category" className="col-sm-4 col-form-label">
            Category:
          </label>
          <div className="col-sm-8">
            <select
              id="category"
              name="category"
              value={announcement.category}
              onChange={handleChange}
              className={`form-select ${errorMessages.category ? "is-invalid" : ""}`}
            >
              <option value="">Select Category</option>
              <option value="Teachers">Teachers</option>
              <option value="Students">Students</option>
              <option value="All">All</option>
            </select>
            {errorMessages.category && (
              <div className="invalid-feedback" style={{ color: 'red' }}>{errorMessages.category}</div>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="description" className="col-sm-4 col-form-label">
            Description:
          </label>
          <div className="col-sm-8">
            <textarea
              id="description"
              name="description"
              value={announcement.description}
              onChange={handleChange}
              className={`form-control ${errorMessages.description ? "is-invalid" : ""}`}
            />
            {errorMessages.description && (
              <div className="invalid-feedback" style={{ color: 'red' }}>{errorMessages.description}</div>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginRight: '20px' }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Announce;
