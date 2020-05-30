import React, { Component } from 'react';
import axios from 'axios';
// import { response } from 'express';


import PortfolioSidebarList from '../portfolio/portfolio-sidebar-list';
import PortfolioForm from '../portfolio/portfolio-form';


export default class PortfolioManager extends Component {
    constructor() {
        super();

        this.state = {
            portfolioItems: [],
            portfolioToEdit: {}
        }

        this.handleForumSubmissionError = this.handleForumSubmissionError.bind(this);
        this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
        this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
    }

    clearPortfolioToEdit() {
        this.setState({
            portfolioToEdit: {}
        });
    }

    handleEditClick(portfolioItem) {
        this.setState({
          portfolioToEdit: portfolioItem
        });
      }

    handleDeleteClick(portfolioItem) {
        // console.log("handleDeleteClick", portfolioItem);
        axios
        .delete(`https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`, 
        {withCredentials: true}
        ).then(response => {
            // console.log('Responce from delete ', response);
            this.setState({
                portfolioItems: this.state.portfolioItems.filter(item => {
                    return item.id !== portfolioItem.id;
                }) 
            })
            return response.data;
        }).catch(error => {
            console.log("handleDeleteClick error", error);
        });
    }

    handleEditFormSubmission() {
        this.getPortfolioItems();
    }

    handleNewFormSubmission(portfolioItem) {
        // console.log("handleNewFormSubmission: ", portfolioItem);
        this.setState({
            portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
        });
    }

    handleForumSubmissionError(error){
        console.log('handleForumSubmissionError', error)
    }


    getPortfolioItems() {
        axios.get("https://zackerybayle.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc", {
            withCredentials: true
        }).then(response => {
            this.setState({
                portfolioItems: [...response.data.portfolio_items]
            });
        }).catch(error => {
            console.log("Error in getPortfolioItems: ",error);
        })
    }

    componentDidMount() {
        this.getPortfolioItems();
    }

    render() {
        return (
            <div className="portfolio-manager-wrapper">
                <div className="left-column">
                    <PortfolioForm 
                        handleNewFormSubmission={this.handleNewFormSubmission}
                        handleEditFormSubmission={this.handleEditFormSubmission}
                        handleForumSubmissionError={this.handleForumSubmissionError}
                        clearPortfolioToEdit={this.clearPortfolioToEdit}
                        portfolioToEdit={this.state.portfolioToEdit}
                    />
                </div>
                <div className="right-column">
                    <PortfolioSidebarList
                        data={this.state.portfolioItems}
                        handleDeleteClick={this.handleDeleteClick}
                        handleEditClick={this.handleEditClick}
                    />
                    
                </div>
                
            </div>
        );
    }
}