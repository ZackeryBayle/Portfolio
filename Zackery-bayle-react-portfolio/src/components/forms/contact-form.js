import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from "axios";



export default class ContactForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: "",
            email: "",
            message: "",
            errorText: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

        this.setState({
            [event.target.name]: event.target.value,
            errorText: ""
        })
    }

    handleSubmit(event) {

        const { name, email, message } = this.state

        const form = axios.post('/api/form', {
            name,
            email,
            message
        });



        event.preventDefault();
    }





    render() {
        return (
            <div className="Contact-Form">
                <Form onSubmit={this.handleSubmit} className="contact-form">
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input 
                            type="text" 
                            name="name" 
                            placeholder="Your Name"
                            value={this.state.name}
                            autoComplete="on"
                            onChange={this.handleChange} 
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input 
                            type="email"
                            name="email"
                            placeholder="Your Email*"
                            value={this.state.email}
                            autoComplete="on"
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="message">Message</Label>
                        <Input 
                            type="textarea" 
                            name="message"
                            id="Message"
                            placeholder="Your Message"
                            onChange={this.handleChange}
                        />

                        <Button>Submit</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}