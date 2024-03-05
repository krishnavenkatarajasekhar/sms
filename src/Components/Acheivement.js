import React from "react";
import Acheive from "../Assets/golden-cup.png";
import { AiFillStar } from "react-icons/ai";
import './Landing.css';

const Acheivement = () => {
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Acheivement</p>
        <div className="testimonial-section-bottom">
        <img src={Acheive} alt="" />
        <p>
        Success is the state or condition of meeting a defined range of expectations. It may be viewed as the opposite of failure.
        </p>
        <div className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2> Success </h2>
      </div>
        <h1 className="primary-heading">What They Are Saying</h1>
        <p className="primary-text">
        Success is the state or condition of meeting a defined range of expectations. It may be viewed as the opposite of failure.
        </p>
      </div>
      
    </div>
  );
};

export default Acheivement;
