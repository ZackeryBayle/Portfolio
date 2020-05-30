import React, { Component } from 'react';
import axios from 'axios';

import { Redirect } from 'react-router';

export default class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errorText: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.state({
            [event.target.name]: event.target.value,
            errorText: ""
        });
    }

    handleSubmit(event) {
        axios
          .post(
            "https://api.devcamp.space/sessions",
            {
              client: {
                email: this.state.email,
                password: this.state.password
              }
            },
            { withCredentials: true }
          )
          .then(response => {
            console.log("response", response);
            if (response.data.status === "created") {
                // console.log("Logged in!!!")
                this.props.handleSuccessfullAuth();
            }else {
                this.setState({
                    errorText: "Wrong Email or Password"
                });
                this.props.handleUnsuccessfullAuth();
            }
          }).catch(error => {
              console.log(error.description);
              this.setState({
                  errorText: error.description
              });
              this.props.handleUnsuccessfullAuth();
          });
    
        event.preventDefault();
      }

    }