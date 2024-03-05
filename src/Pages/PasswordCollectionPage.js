  // PasswordCollectionPage.js
  import React, { useState } from 'react';
  import axios from 'axios';
  import './PasswordCollectionPage.css'; // Import the CSS file
  import { useLocation } from 'react-router-dom';
  import { useHistory } from 'react-router-dom';

  const PasswordCollectionPage = (props) => {
     const { state } = useLocation();
  const { email, type, id, userId } = state || {};

    //const { email, type } = props.location.state || {}; // Destructure directly
    const history = useHistory();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showError, setShowError] = useState(false);

    const validatePassword = () => {
      // Implement your password validation logic here
      // You may want to check length, complexity, etc.
      return password.length >= 6; // Example: Minimum 6 characters
    };

    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
      setConfirmPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();

      // Validate password and confirm password
      if (validatePassword() && password === confirmPassword) {
        // Handle successful submission, e.g., update password in the backend
        console.log('Password submitted successfully:', password);
        // ... rest of the code

        // Implement your server-side logic for updating the password
        const userOb = {
          id: id,
          email: email, // Include the original response data
          type: type,
          password: password, // Update password with newPassword
          confirmPassword: confirmPassword, // Update confirmPassword with confirmNewPassword
        };
        console.log(userOb);
        try {
          const response = await axios.post('http://localhost:8105/api/account/create', userOb);
          if (response.status === 201) {
            console.log(response.data);
            //  this.setState({ isFormSubmitted: true });
            console.log(response.data);
            if (id == null) {
              if (type === 'student') {
                alert('Student Created Successfull');
                history.push('/studentform'); 
              } else {
                alert('Teacher registered successfully!');
                history.push('/createteacher');   
              }
            } else {
              alert('Password updated Successfull');
              history.push('/admindash'); 
            }

           
          } else {
            console.error('Unexpected status code:', response.status);
            console.log(response.data);
          }
        } catch (error) {
          console.error('Error during form submission:', error);
        }
      } else {
        setShowError(true);
      }
    };

    return (
      <div id="password-collection-page" className="password-collection-page-container">
        <h1>User Creation Page</h1>
        {type === 'student' ? (
            <p>Student Id: {userId}</p>
          ) : (
            <p>Teacher Id: {userId}</p>
          )}
        <p>Email: {email}</p>
        <p>Type: {type}</p> 
       
        <form className="password-collection-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              className="password-input"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              id="confirmPassword"
              className="confirm-password-input"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          {showError && (
            <p className="error-message">Passwords do not match or do not meet the criteria.</p>
          )}
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    );
  };

  export default PasswordCollectionPage;
