import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditStudentPassword.css';

const EditStudentPassword = ({ currentUser }) => {
  const [accountData, setAccountData] = useState({
    password: '',
    confirmpassword: '',
    id: null,
  });

  useEffect(() => {
    const fetchAccountProfile = async () => {
      try {
        if (!currentUser || !currentUser.email) return;

        const response = await axios.get(`http://localhost:8105/api/account/get/${currentUser.email}`);
        const fetchedAccountData = response.data;

        console.log('fetchedAccountData:', fetchedAccountData);
        setAccountData({
          password: fetchedAccountData.password,
          confirmpassword: fetchedAccountData.confirmpassword,
          id: fetchedAccountData.id,
        });
      } catch (error) {
        console.error('Error fetching student profile:', error);
      }
    };

    fetchAccountProfile();
  }, [currentUser]);

  const handleInputChange = (fieldName, value) => {
    setAccountData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (!isNaN(accountData.id) && accountData.id !== null) {
        const response = await axios.put(`http://localhost:8105/api/account/update/${accountData.id}`, accountData);
        console.log('Updated student password:', response.data);
      } else {
        console.error('Invalid Id:', accountData.id);
      }
    } catch (error) {
      console.error('Error updating student password:', error);
    }
  };

  return (
    <div id="studentPasswordForm">
      <h1>Edit Student Profile</h1>
      <form>
        <label>
          Password:
          <input
            type="password"
            value={accountData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
          />
        </label>
        <br />

        <label>
          Confirm Password:
          <input
            type="password"
            value={accountData.confirmpassword}
            onChange={(e) => handleInputChange('confirmpassword', e.target.value)}
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

export default EditStudentPassword;
