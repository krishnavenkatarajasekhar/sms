import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // Import UUID library
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


const Acknowledgement = (props) => {
  // Check if props.location exists and contains state
  const paymentData = props?.location?.state?.paymentData || {};
  const { name, amount } = paymentData;

  // Generate Transaction ID
  const transactionId = uuidv4();

  // Get current date and time
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  const saveAsPDF = () => {
    // Select the container element
    const element = document.querySelector(".container");

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("payment_receipt.pdf");
    });
  };

  return (
    <div className="container" id="card-form">
      <h1>Payment Receipt</h1>
      <p>Name: Deepak{name}</p>
      <p>Amount: 1000{amount}</p>
      <p>Date: {currentDate}</p>
      <p>Time: {currentTime}</p>
      <p>Transaction ID: {transactionId}</p>
      <p>Status: Success</p>
      <Link to="#" onClick={saveAsPDF}>
        Save as PDF
      </Link>
    </div>
  );
};

export default Acknowledgement;
