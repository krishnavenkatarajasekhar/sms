import React from "react"; 
import { Link } from 'react-router-dom';
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png"; 
import { FiArrowRight } from "react-icons/fi";
import './Landing.css';

const Home = () => {
  return (
    <div className="home-container">
      
      <div className="home-banner-container">
      <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
           SCHOOL NAME
          </h1>
          <p className="primary-text">
          Education is one of the key components for an individual’s success. It has the ability to shape one’s life in the right direction. 
          </p>
          <button className="secondary-button">
       <Link to="./login">LOGIN <FiArrowRight /></Link>
     </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
