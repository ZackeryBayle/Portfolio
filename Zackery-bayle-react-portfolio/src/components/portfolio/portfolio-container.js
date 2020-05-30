import React, { Component } from "react";
import axios from "axios";  // this isnt used 

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
    constructor() {
        super();
        
        this.state = {
            pageTitle: "Welcome to my Portfolio",
            isLoading:false,
            data: []
        };
        this.handelFilter = this.handelFilter.bind(this);
        this.getPortfolioItems = this.getPortfolioItems.bind(this);
    }

    handelFilter(filter) {
        if(filter === "CLEAR_FILTERS") {
            this.getPortfolioItems();
        }else{
            this.getPortfolioItems(filter);
        }
    }

    getPortfolioItems(filter = null) {
        const axios = require('axios');
     
      // Make a request for a user with a given ID
      axios
        .get('https://zackerybayle.devcamp.space/portfolio/portfolio_items')
        .then(response =>  {
          if(filter) {
            this.setState({
                data: response.data.portfolio_items.filter(item => {
                    return item.category === filter;
                    
                })
            });
          }else {
            this.setState({
                data: response.data.portfolio_items
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
      }

    portfolioItems() {
        
        return this.state.data.map(item => {
            return <PortfolioItem key={item.id} item={item}  />;
        });
    }


    componentDidMount() {
        this.getPortfolioItems();
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>
        }


        return (
            <div className="home-page-wrapper">
                <div className="filer-links">
                    <button className="btn" onClick={() => this.handelFilter('eCommerce')}>eCommerce</button>
                    <button className="btn" onClick={() => this.handelFilter('Scheduling')}>Scheduling</button>
                    <button className="btn" onClick={() => this.handelFilter('Enterprise')}>Enterprise</button>
                    <button className="btn" onClick={() => this.handelFilter('Gaming')}>Gaming</button>
                    <button className="btn" onClick={() => this.handelFilter('CLEAR_FILTERS')}>ALL</button>
                </div>
                <div className="portfolio-items-wrapper">
                    <div className="portfolio-items-grid">
                        {this.portfolioItems()}
                    </div>
                </div>
            </div>
        );
    }
}