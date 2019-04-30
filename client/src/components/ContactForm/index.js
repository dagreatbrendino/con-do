import React, { Component } from "react";
import "./style.css";

class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            subject: "",
            message: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            name: "",
            email: "",
            subject: "",
            message: ""
        });
    }

    render() {
        return (
            <div className="container mt-2 mb-5">
                <div className="row text-center">
                    <div className="col">
                        <p className="display-4 text-center mt-5">Contact Us</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <form>
                            <div className="form-row">
                                <div className="form-group col">
                                    <input className="form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-1 pb-0"
                                        name="name"
                                        value={this.state.name}
                                        type="text"
                                        placeholder="First and Last Name"
                                    />
                                </div>
                                <div className="form-group col">
                                    <input className="form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-1 pb-0"
                                        name="email"
                                        value={this.state.email}
                                        type="text"
                                        placeholder="Email"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <input className="form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-1 pb-0"
                                    name="subject"
                                    value={this.state.subject}
                                    type="text"
                                    placeholder="Subject"
                                />
                            </div>
                            <div className="form-group">
                                <textarea className="form-control border-dark pl-2"
                                    name="message"
                                    value={this.state.message}
                                    type="text"
                                    placeholder="Tell us what you need..."
                                    rows="5"
                                />
                            </div>
                            <button type="submit" class="btn btn-outline-dark">Submit</button>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

export default ContactForm;