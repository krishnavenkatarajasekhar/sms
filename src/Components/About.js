import React from "react";
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/about-background-image.png";
import { BsFillPlayCircleFill } from "react-icons/bs";
import './Landing.css';

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
          School Is An Important Part In Our Life
        </h1>
        <p className="primary-text">
        Education is an essential part of our lives. We are nothing without knowledge, and education is what separates us from others.
        </p>
        <p className="primary-text">
        My school is my second home where I spend most of my time. Above all, it gives me a platform to do better in life and also builds my personality.
        </p>
        
</div>

      </div>
    
    
  );
};

export default About;
