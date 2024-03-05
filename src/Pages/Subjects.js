import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Subjects.css";

function Subjects() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [editSubject, setEditSubject] = useState(null);
  const [error, setError] = useState("");
  const [inputTouched, setInputTouched] = useState(false);

  useEffect(() => {
    // Fetch classes when component mounts
    setClasses(Array.from({ length: 10 }, (_, index) => ({ id: index + 1, name: `Class ${index + 1}` })));
  }, []);

  useEffect(() => {
    // Fetch subjects when selected class changes
    if (selectedClass) {
      fetchSubjects(selectedClass);
    }
  }, [selectedClass]);

  const fetchSubjects = async (classId) => {
    try {
      const response = await axios.get(`http://localhost:8105/api/subjects?classId=${classId}`);
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleAddSubject = async () => {
    // Validate input fields before adding subject
    if (!newSubject.trim() || !selectedClass) {
      setError("Subject name and class are required");
      return;
    } else if (!/^[a-zA-Z\s]*$/.test(newSubject)) {
      setError("Subject name should contain only letters");
      return;
    } else if (subjects.some(subject => subject.name.toLowerCase() === newSubject.trim().toLowerCase())) {
      setError("Subject already exists for this class");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8105/api/subjects", {
        name: newSubject,
        classId: selectedClass,
      });
      await fetchSubjects(selectedClass);
      setNewSubject("");
      setError("");
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };

  const handleEditSubject = async () => {
    // Validate input fields before editing subject
    if (!newSubject.trim() || !selectedClass || !editSubject) {
      setError("Subject name, class, and subject to edit are required");
      return;
    } else if (!/^[a-zA-Z\s]*$/.test(newSubject)) {
      setError("Subject name should contain only letters");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:8105/api/subjects/${editSubject.id}`,
        {
          id: editSubject.id,
          name: newSubject,
          classId: selectedClass,
        }
      );
      await fetchSubjects(selectedClass);
      setNewSubject("");
      setEditSubject(null);
      setError("");
    } catch (error) {
      console.error("Error editing subject:", error);
    }
  };

  const handleDeleteSubject = async (subject) => {
    try {
      const res = await axios.delete(
        `http://localhost:8105/api/subjects/${subject.id}`
      );
      await fetchSubjects(selectedClass);
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };

  const handleBlur = () => {
    setInputTouched(true);
  };

  return (
    <div className="main-content" id="subjectForm">
      <div className="top-container">
      <h1 className="subjects-main-heading">Subjects</h1>

      {/* Class Selection Section */}
      <div>
        <h3 className="subjects-main-heading">Select Class</h3>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Select Class</option>
          {classes.map(cls => (
            <option key={cls.id} value={cls.id}>{cls.name}</option>
          ))}
        </select>
      </div>

      {/* Add New Subject Section */}
      {!editSubject && (
        <div>
          <h3 className="subjects-main-heading">Add New Subject</h3>
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            onBlur={handleBlur}
            placeholder="Subject Name"
          />
          {inputTouched && ((!newSubject.trim() || !selectedClass) && (
            <p style={{ color: "red" }}>Subject name and class are required</p>
          ))}
          {inputTouched && newSubject.trim() && !/^[a-zA-Z\s]*$/.test(newSubject) && (
            <p style={{ color: "red" }}>Subject name should contain only letters</p>
          )}
          {inputTouched && subjects.some(subject => subject.name.toLowerCase() === newSubject.trim().toLowerCase()) && (
            <p style={{ color: "red" }}>Subject already exists for this class</p>
          )}
          <button onClick={handleAddSubject}>Add</button>
        </div>
      )}

      {/* Edit Subject Section */}
      {editSubject && (
        <div>
          <h3>Edit Subject</h3>
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            onBlur={handleBlur}
            placeholder="Subject Name"
          />
          {inputTouched && ((!newSubject.trim() || !selectedClass) && (
            <p style={{ color: "red" }}>Subject name, class, and subject to edit are required</p>
          ))}
          {inputTouched && newSubject.trim() && !/^[a-zA-Z\s]*$/.test(newSubject) && (
            <p style={{ color: "red" }}>Subject name should contain only letters</p>
          )}
          <div>
          <button onClick={handleEditSubject}>Save</button>
        </div>
        </div>
        
      )}
      </div>

      {/* Subjects Table Section */}
      {subjects.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject.id} className="subject-names">
                <td>{subject.name}</td>
                <td>
                  <button
                    className="delete"
                    onClick={() => handleDeleteSubject(subject)}
                  >
                    Delete
                  </button>
                  <button onClick={() => setEditSubject(subject)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No subjects available</p>
      )}
    </div>
  );
}

export default Subjects;
