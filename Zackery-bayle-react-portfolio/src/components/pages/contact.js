import React from 'react';
import ContactForm from "../forms/contact-form";
import SocialFooter from "../helpers/social-footer";

import loginImg from "../../../static/assets/images/auth/login.jpg"
import ProfilePicture from "../../../static/assets/images/round-white.png";

export default function() {
    return(
        <div className="content-page-wrapper">
            <div 
                className="left-column" 
                style={{
                    background: "url("+ loginImg + ") no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }} 
            
            />

            <div className="right-column">
                <img src={ProfilePicture} />
                <ContactForm />

                <SocialFooter />
            </div>

        </div>
    )
}