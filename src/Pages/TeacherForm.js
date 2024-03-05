import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './TeacherForm.css';

const TeacherForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    joiningDate: '',
    ctc: '',
    
    contact: '',
    email: '',
    role: '',
    dob: '',
    experience: '',
    bloodGroup: '',
    qualification: '',
    gender: '',
    classInCharge: '',
    address: '',
  });

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); 
  };

  const validateForm = () => {
    const newErrors = {};
	if (!formData.name || !formData.name.match(/^[a-zA-Z\s]+$/)) {
      newErrors.name = 'Only alphabets are allowed';
    }
    if (!formData.joiningDate) {
      newErrors.joiningDate = 'Joining Date is required';
    }
    if (!formData.ctc || !formData.ctc.match(/^\d+$/)) {
      newErrors.ctc = 'Only numbers are allowed for CTC';
    }
    if (!formData.experience || !formData.experience.match(/^\d+[a-zA-Z]*$/)) {
      newErrors.experience = 'Please enter numbers followed by letters only for experience';
    }
    
   
    if (!formData.contact || !formData.contact.match(/^\d+$/)) {
      newErrors.contact = 'Only numbers are allowed for Contact';
    }
    if (!formData.email || !formData.email.match(/^[a-zA-Z][a-zA-Z0-9]*@gmail\.com$/)) {
      newErrors.email = 'Invalid email address. Must start with alphabets and end with @gmail.com';
    }
    if (!formData.qualification || !formData.qualification.match(/^[a-zA-Z\s.,&]*$/)) {
      newErrors.qualification = 'Only alphabets, dots, commas, and ampersands are allowed';
    }
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    if (!formData.bloodGroup) {
      newErrors.bloodGroup = 'Blood Group is required';
    }
    if (!formData.address) {
      newErrors.address = 'Address is required';
    }
	
	setErrors(newErrors);

    // Check if there are any errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Perform client-side validation
    if (!validateForm()) {
      return;
    }

    try {
    
      // Send data to the server using Axios
      const response = await axios.post('http://localhost:8105/teachers/create', formData);

      console.log('Server response:', response.data);

      if (response.data != null) {
        // Registration successful
      //  alert('Teacher registered successfully!');

        // Redirect to another page (replace '/success' with the actual path)
        history.push({
          pathname: '/password-collection',
          state: { id: null, email: formData.email, type: 'teacher', userId: response.data.teacherId },
        });
      } else {
        // Registration failed
        alert(`Registration failed: ${response.data}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

 return (
    <div className="teacher-form-container" id="teacherForm">
      <h1 className='form-heading'>Teacher Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-column">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-column">
            <label htmlFor="joiningDate">Joining Date:</label>
            <input
              type="date"
              id="joiningDate"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
            />
            {errors.joiningDate && <span className="error-message">{errors.joiningDate}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-column">
            <label htmlFor="ctc">CTC:</label>
            <input
              type="text"
              id="ctc"
              name="ctc"
              value={formData.ctc}
              onChange={handleChange}
            />
            {errors.ctc && <span className="error-message">{errors.ctc}</span>}
          </div>

          <div className="form-column">
            <label htmlFor="experience">Experience:</label>
            <input
              type="text"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
            {errors.experience && <span className="error-message">{errors.experience}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-column">
            <label htmlFor="contact">Contact:</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
            {errors.contact && <span className="error-message">{errors.contact}</span>}
          </div>

          <div className="form-column">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-column">
            <label htmlFor="role">Role:</label>
            <select id="role" name="role" value={formData.role} onChange={handleChange}>
              <option value="">Select Role</option>
              <option value="teaching">Teaching</option>
              <option value="non-teaching">Non-Teaching</option>
            </select>
            {errors.role && <span className="error-message">{errors.role}</span>}
          </div>

          <div className="form-column">
            <label htmlFor="dob">Date of Birth:</label>
            <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} />
            {errors.dob && <span className="error-message">{errors.dob}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-column">
            <label htmlFor="bloodGroup">Blood Group:</label>
            <input
              type="text"
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
            />
            {errors.bloodGroup && <span className="error-message">{errors.bloodGroup}</span>}
          </div>

          <div className="form-column">
            <label htmlFor="qualification">Qualification:</label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
            />
            {errors.qualification && <span className="error-message">{errors.qualification}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-column">
            <label htmlFor="gender">Gender:</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="error-message">{errors.gender}</span>}
          </div>

          <div className="form-column">
            <label htmlFor="classInCharge">Incharge of Class:</label>
            <input
              type="text"
              id="classInCharge"
              name="classInCharge"
              value={formData.classInCharge}
              onChange={handleChange}
            />
            {errors.classInCharge && <span className="error-message">{errors.classInCharge}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-column">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>
        </div>

        <button type="submit" className='button3'>Submit</button>
      </form>
    </div>
  );
};

export default TeacherForm;