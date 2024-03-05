import React from "react";
import Logo from "../Assets/Logo.png";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import './Landing.css';

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
  <div className="footer-logo-container">
    <img src={Logo} alt="" />
  </div>
  <div className="footer-icons">
    <a href="https://www.instagram.com/ganesh_naiduu_?igsh=MXc1YzU5MnpsNGN6Yg==">
      <BsTwitter />
    </a>
    <a href="https://linkedin.com">
      <SiLinkedin />
    </a>
    <a href="https://youtube.com">
      <BsYoutube />
    </a>
    <a href="https://facebook.com">
      <FaFacebookF />
    </a>
  </div>
</div>

      <div className="footer-section-two">
        <div className="footer-section-columns">
      
          <span>Help</span>
          <span>Share</span>
          <span>Carrers</span>
          <span>Acheivement</span>
          <span>Work</span>
        </div>
        <div className="footer-section-columns">
          <span>244-5333-7783</span>
          <span>hello@school.com</span>
          <span>contact@school.com</span>
        </div>
        <div className="footer-section-columns">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
