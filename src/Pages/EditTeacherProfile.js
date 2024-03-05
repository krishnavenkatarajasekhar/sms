// EditTeacherProfile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditTeacherProfile.css';

const EditTeacherProfile = ({ currentUser }) => {
  const { loggedInUser } = currentUser; // Assuming your userObject has a 'userType' property
  const [teacherData, setTeacherData] = useState({
    name: '',
    joiningDate: '',
    ctc: '',
    teacherId: '',
    contact: '',
    email: '',
    role: '',
    dob: '',
    bloodGroup: '',
    qualification: '',
    gender: '',
    classInCharge: '',
    address: '',
  });

  const [isEmailDisabled, setIsEmailDisabled] = useState(true);

  useEffect(() => {
    // Fetch teacher profile based on the email from userObject
    const fetchTeacherProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8105/teachers/email/${currentUser.email}`);
        const fetchedTeacherData = response.data;

        // Set the initial state for the form fields
        setTeacherData({
          name: fetchedTeacherData.name,
          joiningDate: fetchedTeacherData.joiningDate,
          ctc: fetchedTeacherData.ctc,
          teacherId: fetchedTeacherData.teacherId,
          contact: fetchedTeacherData.contact,
          email: fetchedTeacherData.email,
          role: fetchedTeacherData.role,
          dob: fetchedTeacherData.dob,
          bloodGroup: fetchedTeacherData.bloodGroup,
          qualification: fetchedTeacherData.qualification,
          gender: fetchedTeacherData.gender,
          classInCharge: fetchedTeacherData.classInCharge,
          address: fetchedTeacherData.address,
        });

        // Disable the email field
        setIsEmailDisabled(true);
      } catch (error) {
        console.error('Error fetching teacher profile:', error);
      }
    };

    if (currentUser) {
      fetchTeacherProfile();
    }
  }, [currentUser]); // Include userObject in the dependency array

  const handleInputChange = (fieldName, value) => {
    setTeacherData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Send a request to update the teacher profile with the new data
      const response = await axios.put(`http://localhost:8105/teachers/${teacherData.teacherId}`, teacherData);
      console.log('Updated teacher profile:', response.data);
      // You can handle success or show a success message to the user
    } catch (error) {
      console.error('Error updating teacher profile:', error);
      // You can handle errors or show an error message to the user
    }
  };

  return (
    <div id="teacherEditForm">
    <h1>Edit Teacher Profile</h1>
    <form>
      {/* Name */}
      <label>
        Name:
        <input
          type="text"
          value={teacherData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
      </label>
      <br />

      {/* Joining Date */}
      <label>
        Joining Date:
        <input
          type="date"
          value={teacherData.joiningDate}
          onChange={(e) => handleInputChange('joiningDate', e.target.value)}
        />
      </label>
      <br />

      {/* CTC */}
      <label>
        CTC:
        <input
          type="text"
          value={teacherData.ctc}
          onChange={(e) => handleInputChange('ctc', e.target.value)}
        />
      </label>
      <br />
 

      {/* Contact */}
      <label>
        Contact:
        <input
          type="text"
          value={teacherData.contact}
          onChange={(e) => handleInputChange('contact', e.target.value)}
        />
      </label>
      <br />

      {/* Email */}
      <label>
        Email:
        <input
          type="text"
          value={teacherData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          disabled={isEmailDisabled}
        />
      </label>
      <br />

      {/* Role */}
      <label>
        Role:
        <select
          value={teacherData.role}
          onChange={(e) => handleInputChange('role', e.target.value)}
        >
          <option value="teaching">Teaching</option>
          <option value="non-teaching">Non-Teaching</option>
        </select>
      </label>
      <br />

      {/* Date of Birth */}
      <label>
        Date of Birth:
        <input
          type="date"
          value={teacherData.dob}
          onChange={(e) => handleInputChange('dob', e.target.value)}
        />
      </label>
      <br />

      {/* Blood Group */}
      <label>
        Blood Group:
        <input
          type="text"
          value={teacherData.bloodGroup}
          onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
        />
      </label>
      <br />

      {/* Qualification */}
      <label>
        Qualification:
        <input
          type="text"
          value={teacherData.qualification}
          onChange={(e) => handleInputChange('qualification', e.target.value)}
        />
      </label>
      <br />

      {/* Gender */}
      <label>
        Gender:
        <select
          value={teacherData.gender}
          onChange={(e) => handleInputChange('gender', e.target.value)}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <br />

      {/* Class In Charge */}
      <label>
        Incharge of Class:
        <input
          type="text"
          value={teacherData.classInCharge}
          onChange={(e) => handleInputChange('classInCharge', e.target.value)}
        />
      </label>
      <br />

      {/* Address */}
      <label>
        Address:
        <input
          type="text"
          value={teacherData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
        />
      </label>
      <br />

      <button type="button" onClick={handleSave}>
        Save
      </button>
    </form>
  </div>
  );
};

export default EditTeacherProfile;
