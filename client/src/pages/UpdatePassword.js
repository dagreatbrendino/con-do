import React, { Component } from "react";
import API from "../utils/API"
import LandingNavbar from "../components/LandingNavbar";
import LoginJumbotron from "../components/LoginJumbotron";

class UpdatePassword extends Component {
    //the state for the login component keeps track fo the email and password inputs
    constructor() {
        super()
        this.state = {
            password: "",
            passwordConfirm: "",
            redirectTo: null
        }
        this.handleInputChange.bind(this)
        this.handleFormSubmit.bind(this)
    }
    //updating our input fields as the user enters keys
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    //calling the loginUser method of our API which routes to the backend and attempts to log in user agent via passport
    //with the given credentials
    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.password === this.state.passwordConfirm) {
            API.updatePW({
                password: this.state.password,
            })
                .then(res => {

                });
        }
    }
    render() {
        return (
            <div>
                <LandingNavbar />
                <div className="container">
                    <LoginJumbotron />
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <form>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="pt-2 border-bottom border-dark rounded-0"><i class="fas fa-envelope fa-lg"></i></span>
                                    </div>
                                    <input className="form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-2"
                                        aria-describedby="emailBlock"
                                        value={this.state.password}
                                        onChange={this.handleInputChange}
                                        type="password"
                                        name="password"
                                        placeholder="Email (required)"
                                    />
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="pt-2 border-bottom border-dark rounded-0"><i class="fas fa-lock fa-lg"></i></span>
                                    </div>
                                    <input className="form-control border-top-0 border-left-0 border-right-0 border-dark rounded-0 px-2"
                                        value={this.state.passwordConfirm}
                                        onChange={this.handleInputChange}
                                        type="passwordCofirm"
                                        name="passwordConfirm"
                                        placeholder="Password (required)"
                                    />
                                </div>
                                <button className="btn btn-outline-dark px-3"
                                    type="submit"
                                    name="login"
                                    onClick={this.handleFormSubmit}
                                >Update Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}
export default UpdatePassword;