import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; 
import './Debit.css';

const PaymentForm = () => {
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');
  const history = useHistory(); 

  const handleCardholderNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value) || value === '') { // Check if value contains only alphabets or is empty
      setCardholderName(value);
    }
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setCardNumber(value);
  };

  const handleExpiryChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setExpiry(value);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setCvv(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your payment submission logic here
    // For this example, let's just navigate to the acknowledgment page
    history.push('/card-form'); // Navigating to acknowledgment page
  };

  return (
    <div className="payment-form-container" id='payment-debit'>
      <h2>Enter Payment Details</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name on Card:</label>
          <input
            type="text"
            value={cardholderName}
            onChange={handleCardholderNameChange}
            placeholder="Enter Name on Card"
            required
          />
        </div>
        <div className="form-group">
          <label>Debit Card Number:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            maxLength="16"
            placeholder="Enter Card Number"
            required
          />
        </div>
        <div className="form-group">
          <label>Expiry Date:</label>
          <input
            type="text"
            value={expiry}
            onChange={handleExpiryChange}
            maxLength="4"
            placeholder="MMYY"
            required
          />
        </div>
        <div className="form-group">
          <label>CVV:</label>
          <input
            type="text"
            value={cvv}
            onChange={handleCvvChange}
            maxLength="3"
            placeholder="Enter CVV"
            required
          />
        </div>
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default PaymentForm;
