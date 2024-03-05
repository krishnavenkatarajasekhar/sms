import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Fee.css'; 

function PayFee({ currentUser }) { // Destructure currentUser from props
    const [totalFees, setTotalFee] = useState('');
    const [balanceFees, setBalanceFee] = useState('');
    const [amountToPay, setAmountToPay] = useState('');
    const history = useHistory(); // useHistory hook for navigation

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`http://localhost:8105/students/email/${currentUser.email}`);
                const { data } = response;
                if (data && data.totalFees && data.balanceFees) {
                    setTotalFee(data.totalFees);
                    setBalanceFee(data.balanceFees);
                }
            } catch (error) {
                console.error('Error fetching fee information:', error);
            }
        };

        fetchStudentData(); // Call the function to fetch student data
    }, [currentUser.email]); // Add currentUser.email as a dependency

    const handleAmountChange = (event) => {
        setAmountToPay(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    
        console.log('Amount to pay:', amountToPay);
        // Navigate to another page here
        history.push('/payment-form'); // Navigating to payment confirmation page
    }

    return (
        <div className="pay-fee-container" id='fee-form'>
            <h1 className="pay-fee-heading">Pay Fee</h1>
            <form onSubmit={handleSubmit} className="pay-fee-form">
                <div className="form-group1">
                    <label htmlFor="totalFee">Total Fee:</label>
                    <input type="text" id="totalFee" name="totalFee" value={totalFees} readOnly className="form-control" />
                </div>
                <div className="form-group1">
                    <label htmlFor="balanceFee">Balance Fee:</label>
                    <input type="text" id="balanceFee" name="balanceFee" value={balanceFees} readOnly className="form-control" />
                </div>
                <div className="form-group1">
                    <label htmlFor="amountToPay">Amount to Pay:</label>
                    <input type="number" id="amountToPay" name="amountToPay" value={amountToPay} onChange={handleAmountChange} required className="form-control" />
                </div>
                <button type="submit" className="pay-fee-button">Pay</button>
            </form>
        </div>
    );
}

export default PayFee;
