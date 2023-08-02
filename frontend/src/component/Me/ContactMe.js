import React, { Fragment, useState } from 'react';
import { GrMail } from 'react-icons/gr';
import { FaUser } from 'react-icons/fa';
import './ContactMe.css';
import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

const ContactMe = () => {
  const alert = useAlert();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to track form submission

  const contactSubmit = (e) => {
    e.preventDefault();
    // Your form submission logic goes here

    // After the form is successfully submitted, update the isSubmitted state to true
    setIsSubmitted(true);
  };

  
  if (isSubmitted) {
    alert.success('Details sent Successfully');
    navigate('/');
  }

  return (
    <Fragment>
      <MetaData title="Contact Me -- E-COMMERCE" />
      <div className="contactMain">
        <div className="contactContainer">
          <div className="contactBox">
            <form className="contactForm" onSubmit={contactSubmit}>
              <div className="registerName">
                <FaUser />
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="registerEmail">
                <GrMail />
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <input type="submit" className="contactBtn" value="Send" />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContactMe;
