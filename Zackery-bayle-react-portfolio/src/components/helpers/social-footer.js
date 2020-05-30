import React, { Component } from 'react';

import { FrontAwesomeIcon, FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class SocialFooter extends Component {
    render() {
        return (
            <div className="social-footer-wrapper">
                <div className="link-wrapper">
                    <div className="link">

                        <div onClick={()=> window.open("https://www.linkedin.com/in/zackery-bayle-b9567a94/", "_blank")}>
                            <FontAwesomeIcon icon={['fab', 'linkedin']} />
                        </div>
                        <div onClick={()=> window.open("https://github.com/ZackeryBayle", "_blank")}>
                            <FontAwesomeIcon icon={['fab', 'github-square']} />
                        </div>
                        <div onClick={()=> window.open("http://zackerybayle.github.io/about-me/", "_blank")}>
                            <FontAwesomeIcon icon={['fas', 'book']} />
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}