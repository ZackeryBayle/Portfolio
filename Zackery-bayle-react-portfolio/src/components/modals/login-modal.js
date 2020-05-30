import React, { Component } from 'react';
import ReactModal from "react-modal";

// import BlogForm from "../blog/blog-form";   Create login-form

ReactModal.setAppElement(".app-wrapper");

export default class LoginModal extends Component {
    render() {
        return (
            <ReactModal
                onRequestClose={() => {
                    this.props.handleModalClose();
                }}
            >

            </ReactModal>
        );
    }
}