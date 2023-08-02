import React from 'react';
import './AboutMe.css';
import {FaFacebookSquare} from "react-icons/fa"
import {FaInstagramSquare} from "react-icons/fa"
import {IoLogoWhatsapp} from "react-icons/io"


const AboutMe = () => {
  return (
   <div className="main">
    <div className="acontainer">
        <div className="box">
        <div className="about-me-container">
      <h1 className="name">MOHAMMED UBAID</h1>
      <p className="phone">Phone: 6309779712</p>
      <p className="phone">email: mdubaid1821@gmail.com</p>
    
      <div className="social-media">
        <a href="https://www.facebook.com/md.ubaid.7330" target="_blank" rel="noopener noreferrer">
          <FaFacebookSquare/>
        </a>
        <a href="https://www.instagram.com/md.ubaid.7330" target="_blank" rel="noopener noreferrer">
          <FaInstagramSquare/>
        </a>
        <a href="https://web.whatsapp.com/">
          <IoLogoWhatsapp/>
        </a>
        
        
      </div>
    </div>
        </div>
    </div>
   </div>
  );
};

export default AboutMe;
