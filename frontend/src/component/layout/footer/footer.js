import React from "react";
import playstore from "../../../images/playstore.png";
import ios from "../../../images/ios.png";
import "./Footer.css"
import {FaFacebookSquare, FaInstagramSquare, FaTelegram} from "react-icons/fa"

const Footer = () =>{
    return(
        <footer id="footer">
            <div className="leftFooter">
                <p>Download the app for Android and IOS</p>
                <img src={playstore} alt="playstore" />
                <img src={ios} alt="ios"/>


            </div>

            <div className="midFooter">
                <h1>E-COMMERCE</h1>
                <p>Customer satisfaction is our priority</p>
                <p>Copy Rights 2023 &Copy; MD.Ubaid</p>


            </div>

            <div className="rightFooter">
                <h2>Follow Us</h2>
                <a href="https://www.facebook.com/md.ubaid.7330" target="_blank" rel="noopener noreferrer">
                         <FaFacebookSquare/>  FACEBOOK
                 </a>
                 <a href="https://www.instagram.com/md.ubaid.7330" target="_blank" rel="noopener noreferrer">
                <FaInstagramSquare/>   INSTAGRAM
              </a>
                <a href="www.telegram.com/ubaid12"><FaTelegram/>Telegram</a>

            </div>
        </footer>
    )
};


export default Footer;