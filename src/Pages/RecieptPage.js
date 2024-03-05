import React, { useState, useRef } from 'react';
import './ReceiptPage.css';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const ReceiptPage = () => {
  const [data, setData] = useState({
    id: '',
    receiptData: null,
    error: null,
  });

  const receiptRef = useRef(null);

  const handleChange = (field, value) => {
    setData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleViewReceipt = async () => {
    try {
      const response = await axios.get(`http://localhost:8105/api/receipts/${data.id}`);
      if (response.status === 200) {
        const receiptData = response.data;
        console.log('Receipt data:', receiptData);
        setData((prevData) => ({ ...prevData, receiptData: receiptData, error: null }));
      } else {
        console.error('Failed to fetch receipt:', response.statusText);
        setData((prevData) => ({ ...prevData, error: response.statusText }));
      }
    } catch (error) {
      console.error('Error occurred while fetching receipt:', error);
      setData((prevData) => ({ ...prevData, error: 'Error occurred while fetching receipt' }));
    }
  };

  const handleDownloadReceipt = () => {
    const input = receiptRef.current;
    const scaleFactor = 2; // Adjust as needed
    const pdfWidth = 297; // A4 width in mm
    const pdfHeight = 210; // A4 height in mm
  
    // Adjust table width
    const table = input.querySelector('table');
    table.style.width = '100%'; // Increase table width
  
    html2canvas(input, { scale: scaleFactor })
      .then((canvas) => {
        // Adjust canvas dimensions
        const scaledWidth = pdfWidth;
        const scaledHeight = (canvas.height * pdfWidth) / canvas.width;
  
        // Create PDF
        const pdf = new jsPDF('l', 'mm', 'a4');
        pdf.addImage(canvas, 'PNG', 0, 0, scaledWidth, scaledHeight);
        pdf.save('receipt.pdf');
        
        // Reset table width after PDF creation
        table.style.width = ''; // Reset table width
      });
  };
  

  return (
    <div className="receipt-page-container" id='receipt-form-admin'>
      <h1 style={{ color: 'blue',textAlign:'center', paddingTop: '20px' }}>Receipt Page</h1>
      <table>
        <thead>
          <tr>
            <th colSpan="2">Student ID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="2">
              <input
                type="text"
                value={data.id}
                onChange={(e) => handleChange('id', e.target.value)} className='sudentId-input'
                placeholder="Enter Student ID"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleViewReceipt}>View Receipt</button>
      <button onClick={handleDownloadReceipt}>Download Receipt as PDF</button>
      {data.error && <p className="error-message">{data.error}</p>}
      {data.receiptData && (
        <div ref={receiptRef}>
          <h2 style={{ textAlign: 'center' }}>Receipt Details</h2>
          <table>
            <thead>
              <tr>
                <th style={{ fontWeight: 'bold', textAlign: 'center' }}>ID</th>
                <th style={{ fontWeight: 'bold', textAlign: 'center' }}>Transaction ID</th>
                <th style={{ fontWeight: 'bold', textAlign: 'center' }}>Amount</th>
                <th style={{ fontWeight: 'bold', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: 'center' }}>{data.receiptData.id}</td>
                <td style={{ textAlign: 'center' }}>{data.receiptData.transactionId}</td>
                <td style={{ textAlign: 'center' }}>{data.receiptData.amount}</td>
                <td style={{ textAlign: 'center' }}>{data.receiptData.status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReceiptPage;
