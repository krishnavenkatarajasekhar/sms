import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditStudentProfile.css';

const EditStudentProfile = ({ currentUser }) => {

  const [studentData, setStudentData] = useState({
    studentId:'',
    fullName: '',
    motherName: '',
    bloodGroup: '',
    contact: '',
    gender: '',
    className: '',
    classTeacher: '',
    transport: '',
    
    firstLanguage: '',
    dob: new Date(),
    fatherName: '',
    address: '',
    email: '',
   
    section: '',
    dateOfJoining: new Date(),
    totalFees: '',
  });

  const [isEmailDisabled, setIsEmailDisabled] = useState(true);

  useEffect(() => {
    // Fetch student profile based on the email from userObject
    const fetchStudentProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8105/students/email/${currentUser.email}`);
        const fetchedStudentData = response.data;
      
        console.log('fetchedStudentData:', fetchedStudentData);
        // Set the initial state for the form fields
        setStudentData({
          studentId: fetchedStudentData.studentId,
          fullName: fetchedStudentData.fullName,
          motherName: fetchedStudentData.motherName,
          bloodGroup: fetchedStudentData.bloodGroup,
          contact: fetchedStudentData.contact,
          gender: fetchedStudentData.gender,
          className: fetchedStudentData.className,
          classTeacher: fetchedStudentData.classTeacher,
          transport: fetchedStudentData.transport,
        
          firstLanguage: fetchedStudentData.firstLanguage,
          dob:  fetchedStudentData.dob,
          fatherName: fetchedStudentData.fatherName,
          address: fetchedStudentData.address,
          email: fetchedStudentData.email,
         
          section: fetchedStudentData.section,
          dateOfJoining: fetchedStudentData.dateOfJoining,
          totalFees: fetchedStudentData.totalFees,
        });

        // Disable the email field
        setIsEmailDisabled(true);
      } catch (error) {
        console.error('Error fetching student profile:', error);
      }
    };

    if (currentUser) {
      fetchStudentProfile();
    }
  }, [currentUser]); // Include userObject in the dependency array

  const handleInputChange = (fieldName, value) => {
    setStudentData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Send a request to update the student profile with the new data
      const response = await axios.put(`http://localhost:8105/students/${studentData.studentId}`, studentData);
      console.log('Updated student profile:', response.data);
      // You can handle success or show a success message to the user
    } catch (error) {
      console.error('Error updating student profile:', error);
      // You can handle errors or show an error message to the user
    }
  };

  return (
    <div  id="studentEditForm">
  <h1>Edit Student Profile</h1>
  <form>
    

    {/* Full Name */}
    <label>
      Full Name:
      <input
        type="text"
        value={studentData.fullName}
        onChange={(e) => handleInputChange('fullName', e.target.value)}
      />
    </label>
    <br />

    {/* Mother Name */}
    <label>
      Mother Name:
      <input
        type="text"
        value={studentData.motherName}
        onChange={(e) => handleInputChange('motherName', e.target.value)}
      />
    </label>
    <br />

    {/* Blood Group */}
    <label>
      Blood Group:
      <input
        type="text"
        value={studentData.bloodGroup}
        onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
      />
    </label>
    <br />

    {/* Contact */}
    <label>
      Contact:
      <input
        type="text"
        value={studentData.contact}
        onChange={(e) => handleInputChange('contact', e.target.value)}
      />
    </label>
    <br />

    {/* Gender */}
    <label>
      Gender:
      <input
        type="text"
        value={studentData.gender}
        onChange={(e) => handleInputChange('gender', e.target.value)}
      />
    </label>
    <br />

    {/* Class Name */}
    <label>
      Class Name:
      <input
        type="text"
        value={studentData.className}
        onChange={(e) => handleInputChange('className', e.target.value)}
      />
    </label>
    <br />

    {/* Class Teacher */}
    <label>
      Class Teacher:
      <input
        type="text"
        value={studentData.classTeacher}
        onChange={(e) => handleInputChange('classTeacher', e.target.value)}
      />
    </label>
    <br />

    {/* Transport */}
    <label>
      Transport:
      <input
        type="text"
        value={studentData.transport}
        onChange={(e) => handleInputChange('transport', e.target.value)}
      />
    </label>
    <br />

    {/* Documents (File Input) */}
    
    {/* First Language */}
    <label>
      First Language:
      <input
        type="text"
        value={studentData.firstLanguage}
        onChange={(e) => handleInputChange('firstLanguage', e.target.value)}
      />
    </label>
    <br />

    {/* Date of Birth */}
    <label>
      Date of Birth:
      <input
        type="date"
        value={studentData.dob}
        onChange={(e) => handleInputChange('dob', e.target.value)}
      />
    </label>
    <br />

    {/* Father Name */}
    <label>
      Father Name:
      <input
        type="text"
        value={studentData.fatherName}
        onChange={(e) => handleInputChange('fatherName', e.target.value)}
      />
    </label>
    <br />

    {/* Address */}
    <label>
      Address:
      <input
        type="text"
        value={studentData.address}
        onChange={(e) => handleInputChange('address', e.target.value)}
      />
    </label>
    <br />

    {/* Email */}
    <label>
      Email:
      <input
        type="text"
        value={studentData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        disabled={isEmailDisabled}
      />
    </label>
    <br />

    {/* Caste */}
   
   

    {/* Section */}
    <label>
      Section:
      <input
        type="text"
        value={studentData.section}
        onChange={(e) => handleInputChange('section', e.target.value)}
      />
    </label>
    <br />

    {/* Date of Joining */}
    <label>
      Date of Joining:
      <input
        type="date"
        value={studentData.dateOfJoining}
        onChange={(e) => handleInputChange('dateOfJoining', e.target.value)}
      />
    </label>
    <br />

    {/* Total Fees */}
    <label>
      Total Fees:
      <input
        type="text"
        value={studentData.totalFees}
        onChange={(e) => handleInputChange('totalFees', e.target.value)}
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

export default EditStudentProfile;
