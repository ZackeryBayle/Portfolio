import React, { Component } from 'react';
import axios from "axios";
// import { response } from 'express';
import { FrontAwesomeIcon, FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import RichTextEditor from "../forms/rich-text-editor";
import DropZoneComponent from "react-dropzone-component";
import { Redirect } from 'react-router';

export default class BlogForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: "",
            title: "",
            blog_status: "draft",
            content: "",
            featured_image: "",
            apiUrl: "https://zackerybayle.devcamp.space/portfolio/portfolio_blogs",
            apiAction: "post"
        }


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this); 


        //drop Zone bind
        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this);
        this.deleteImage = this.deleteImage.bind(this);

        this.featuredImageRef = React.createRef();

    }

    deleteImage(imageType) {
        axios.delete(
            `https://api.devcamp.space/portfolio/delete-portfolio-blog-image/${this.props.blog.id}?image_type=${imageType}`,
            { withCredentials: true }
        ).then(response => {
            this.props.handleFeaturedImageDelete();
            console.log("Resonce from blog image delete", response);
        }).catch(error => {
            console.log("deleteImage error", error);
        })
    }

    componentWillMount() {
        if (this.props.editMode) {
            this.setState({
                id: this.props.blog.id,
                title: this.props.blog.title,
                blog_status: this.props.blog.blog_status,  //Fixed Status mistype
                content: this.props.blog.content,
                apiUrl: `https://zackerybayle.devcamp.space/portfolio/portfolio_blogs/${this.props.blog.id}`,
                apiAction: "patch"
            });
        }
    }


    componentConfig() {
        return {
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        }
    }

    djsConfig() {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    handleFeaturedImageDrop() {
        return {
            addedfile: file => this.setState({featured_image: file})        
        }
    }



    handleRichTextEditorChange(content) {
        this.setState({
            content
        });
    }

    buildForm() {
        let formData = new FormData();

        formData.append("portfolio_blog[title]", this.state.title);
        formData.append("portfolio_blog[blog_status]", this.state.blog_status);
        formData.append("portfolio_blog[content]", this.state.content);

        if (this.state.featured_image) {
        formData.append("portfolio_blog[featured_image]", this.state.featured_image);

        }

        return formData;
    }

    handleSubmit(event) {
        axios({
            method: this.state.apiAction,   //Axios modern method change
            url: this.state.apiUrl,
            data: this.buildForm(),
            withCredentials: true
        })
        .then(
            response => {
                if (this.state.featured_image) {
                    this.featuredImageRef.current.dropzone.removeAllFiles(); //Error can not read property of dropzone
                }
                this.setState({
                    title: "",
                    blog_status: "",
                    content: "",
                    featured_image: ""
                });
                
                if (this.props.editMode) {
                    //Update BLogDetail
                    this.props.handleUpdateFormSubmission(
                        response.data.portfolio_blog
                    );
                } else {
                    this.props.handleSuccessfullFormSubmission(
                        response.data.portfolio_blog
                    );
                }

            }   
        ).catch(error => {
            console.log("HandleSubmitError", error);
        });
        event.preventDefault();
    }

  

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
                <div className="two-column">
                    <input
                        type="text"
                        onChange={this.handleChange}
                        name="title"
                        placeholder="Blog Title"
                        value={this.state.title}
                    />
                    <input
                        type="text"
                        onChange={this.handleChange}
                        name="blog_status"
                        placeholder="Blog Status"
                        value={this.state.blog_status}
                    />
                </div>
                <div className="one-column">
                    <RichTextEditor 
                        handleRichTextEditorChange={this.handleRichTextEditorChange}
                        editMode={this.props.editMode}
                        contentToEdit={
                            this.props.editMode && this.props.blog.content 
                            ? this.props.blog.content 
                            : null
                        }
                    />
                </div>

                <div className="image-uploaders">
                    {this.props.editMode && this.props.blog.featured_image_url ? (
                        <div className="portfolio-manager-image-wrapper">
                                <img src={this.props.blog.featured_image_url} />
                                <div className="image-removal-link">
                                    <a onClick={() => this.deleteImage("featured_image")}>
                                        <FontAwesomeIcon icon="eraser" />
                                    </a>
                                </div>
                            </div>
                    ) : (
                        <DropZoneComponent
                            ref={this.featuredImageRef} //WHy ref
                            config={this.componentConfig()}
                            djsConfig={this.djsConfig()}
                            eventHandlers={this.handleFeaturedImageDrop()}
                        >
                            <div className="dz-message">Featured Image</div>
                        </DropZoneComponent>
                    )}
                </div>

                <button className="btn">Save</button>
            </form>
        );
    }
}


//SOURCE  --


