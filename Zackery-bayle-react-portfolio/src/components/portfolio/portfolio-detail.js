import React, { Component } from 'react';

import axios from "axios";
// import { response } from 'express';






export default class PortfolioDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portfolioItem: {}
        }

    }

    componentWillMount() {
        this.getPortfolioItem();
    }

    getPortfolioItem() {
        axios
        .get(
            `https://zackerybayle.devcamp.space/portfolio/portfolio_items/${this.props.match.params.slug}`, 
            {withCredentials: true})
            .then(response => {
                this.setState({
                    portfolioItem: response.data.portfolio_item
                })
            }).catch(error => {
                console.log("getPortfolioItem Error: ", error);
        });

    }



    render() {
        const {
            banner_image_url,
            category,
            description,
            logo_url,
            name,
            thumb_image_url,
            url
        } = this.state.portfolioItem;

        const bannerStyles = {
            backgroundImage: "url(" + banner_image_url + ")",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center"
        };

        const logoStyle = {
            width: "200px"
        };

        return (
            <div className="page-wrapper">
                <div className="content-wrapper">
                    <div className="top-wrapper" style={bannerStyles}>
                        <img src={logo_url} style={logoStyle} />
                    </div>
                    <div className="b-wrapper">
                        <div className="middle-wrapper">
                            <div className="title-wrapper">
                                <h2>{name}</h2>
                            </div>
                            <div className="descriotion-wrapper">
                                <h4>{description}</h4>
                            </div>
                        </div>

                    

                        <div className="bottom-wrapper">
                            <button onClick={()=> window.open(url, "_blank")}>Visit {name}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}