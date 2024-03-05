import React, { useState } from 'react';
import { useHistory  } from 'react-router-dom'; 
import axios from 'axios';
import './Login.css';

const LoginForm = ({ handleLogin }) => {
  const history = useHistory();
  const [activeForm, setActiveForm] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupPasswordConfirm, setSignupPasswordConfirm] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [resetStage, setResetStage] = useState('email'); // 'email', 'otp', 'password'
  const [verificationResponse, setVerificationResponse] = useState(null);
 
  const handleSwitchForm = (form) => {
    setActiveForm(form);
    setResetStage('email'); // Reset the reset stage when switching forms
  };


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    
    try {
      const response = await axios.post('http://localhost:8105/api/account/login', {
        email: loginEmail,
        password: loginPassword,
      });

      const token = response.data.token;
      // Store the token in local storage or context
      // localStorage.setItem('token', token); // Uncomment if you want to store the token
      const user = response.data;
      // Redirect to another page on successful login
      if(user != null && user != "") {
        handleLogin(user);
        if (user.type === 'student'){
          history.push('/UserDash'); 
          axios.get('http://localhost:8105/api/account/login')
        }

        else if (user.type === 'teacher'){
          history.push('/Teacherdash'); 
        }
        else if (user.type === 'management'){
          history.push('/UserDash'); 
        } else {
          history.push('/AdminDash'); // Assuming you have a route for another page
  
        }
        
     
        setPopupMessage('Login successful!');
        setShowPopup(true);
        console.log('Login successful. Token:', token);
      } else {
        setPopupMessage('Invalid email or password. Please try again.');
        setShowPopup(true);
        console.log('Invalid email or password. Please try again.');
      }
   
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setPopupMessage('Invalid email or password. Please try again.');
      } else {
        setPopupMessage('An error occurred during login. Please try again later.');
      }
      setShowPopup(true);
      console.error('Error during login:', error);
    } 
  };


  const handleResetSubmit = async (e) => {
    e.preventDefault();
    
  try {
    // Implement your server-side logic for sending OTP and handling forgot password flow
    // You may need additional API endpoints for sending OTP, verifying OTP, and updating the password
    const response = await axios.post('http://localhost:8105/api/email/sendOtp', {
      toEmail: resetEmail,
    });

    setPopupMessage('OTP sent to your email. Check your inbox.');
    setShowPopup(true);
    // Assuming you have an OTP flow, switch to OTP verification form
    setResetStage('otp'); 
    
  } catch (error) {
    setPopupMessage('An error occurred. Please try again later.');
    setShowPopup(true);
    console.error('Error during forgot password:', error);
  }
};

const handleOtpVerificationSubmit = async (e) => {
  e.preventDefault();

  try {
    // Implement your server-side logic for verifying OTP
    const response = await axios.post('http://localhost:8105/api/email/verify-otp', {
      email: resetEmail,
      otp,
    });
 // Store the verification response in the local variable
 setVerificationResponse(response);
    setPopupMessage('OTP verified. Enter your new password.');
    setShowPopup(true);
    // Assuming OTP is verified, switch to password reset form
    setResetStage('password');
  } catch (error) {
    setPopupMessage('Invalid OTP. Please try again.');
    setShowPopup(true);
    console.error('Error during OTP verification:', error);
  }
};

const handlePasswordResetSubmit = async (e) => {
  e.preventDefault();

  try {
    // Implement your server-side logic for updating the password
    const userOb = {
      ...verificationResponse.data, // Include the original response data
      password: newPassword, // Update password with newPassword
      confirmPassword: confirmNewPassword, // Update confirmPassword with confirmNewPassword
   
    }
     console.log(userOb);
    const response = await axios.post('http://localhost:8105/api/account/create', userOb  );

    setPopupMessage('Password reset successful. You can now login with your new password.');
    setShowPopup(true);
    // Assuming password is reset, switch back to login form
    setActiveForm('login');
  } catch (error) {
    setPopupMessage('An error occurred during password reset. Please try again later.');
    setShowPopup(true);
    console.error('Error during password reset:', error);
  }
};


  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="forms-section">
      <h1 className="section-title">LoginForm</h1>
      <div className="forms">
        <div className={`form-wrapper ${activeForm === 'login' ? 'is-active' : ''}`}>
          <button type="button" className="switcher switcher-login" onClick={() => handleSwitchForm('login')}>
            Login
            <span className="underline"></span>
          </button>
          <form className="form form-login" onSubmit={handleLoginSubmit}>
            <fieldset>
              <legend>Please, enter your email and password for login.</legend>
              <div className="input-block">
                <label htmlFor="login-email">E-mail</label>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="input-block">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
            </fieldset>
            <button type="submit" className="btn-login">
              Login
            </button>
          </form>
        </div>
        <div className={`form-wrapper ${activeForm === 'forgot' ? 'is-active' : ''}`}>
        <button type="button" className="switcher switcher-forgot" onClick={() => handleSwitchForm('forgot')}>
          Forgot Password
          <span className="underline"></span>
        </button>
        <form className="form form-signup" >
          {resetStage === 'email' && (
            <fieldset>
              <legend>Enter your email to reset the password.</legend>
              <div className="input-block">
                <label htmlFor="reset-email">E-mail</label>
                <input
                  id="reset-email"
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>
            </fieldset>
          )}
          {resetStage === 'otp' && (
            <fieldset>
              <legend>Enter the OTP sent to your email.</legend>
              <div className="input-block">
                <label htmlFor="otp">OTP</label>
                <input
                  id="otp"
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            </fieldset>
          )}
          {resetStage === 'password' && (
            <fieldset>
              <legend>Enter your new password.</legend>
              <div className="input-block">
                <label htmlFor="new-password">New Password</label>
                <input
                  id="new-password"
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="input-block">
                <label htmlFor="confirm-new-password">Confirm New Password</label>
                <input
                  id="confirm-new-password"
                  type="password"
                  required
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
            </fieldset>
          )}
          <button type="submit" className="btn-reset"
              onClick={(e)=> {
                if (resetStage === 'otp') {
                  handleOtpVerificationSubmit(e);
                } else if (resetStage === 'password') {
                  handlePasswordResetSubmit(e);
                } else {
                  handleResetSubmit(e);
                }
              }}>
            {resetStage === 'email' ? 'Send OTP' : resetStage === 'otp' ? 'Verify OTP' : 'Reset Password'}
          </button>
        </form>
        </div>
      </div>
      {showPopup && (
      <div className="popup-container">
        <div className="popup-content">
          <p>{popupMessage}</p>
          <button onClick={closePopup}>OK</button>
        </div>
      </div>
      )}
      </div>
    
      
  

  );
};

export default LoginForm;
