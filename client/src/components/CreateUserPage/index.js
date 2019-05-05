import React, {Component} from "react";
import { Link } from "react-router-dom";
import {Redirect} from "react-router-dom"
import API from "../../utils/API"
import Select from "./select-dropdowns"

class CreateUser extends Component {
  //the signup state keeps track of all of the input fields in the signup form
  constructor(props){
    console.log(props)
    super(props)
    this.state = {
      email: "",
      name: "",
      userType: "delegate",
      school: "",
      country: "",
      committee: "",
      schoolOptions: [],
      committeeOptions: [],
      recentName: "",
      recentEmail: "",
      committeeAddInput: "",
      schoolAddInput: ""
    }
  
  }
    
    //get all the options when the component first mounts
    componentDidMount = ()=>{
      this.getOptions();
    }
    getOptions = ()=>{
      API.getSchools().then(res =>{
        this.setState({schoolOptions: res.data})
      })
      API.getCommittees().then(res=>{
        this.setState({committeeOptions: res.data})
      })
    }
    handleSelect = (selected) =>{
      const  name = selected.name
      const value = selected.value
      this.setState({
        [name]: value
      })
    } 
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };
    //on submit we attempt to create a new user with the given values via the API that hits a route that queries our database
    handleFormSubmit = event =>{
        event.preventDefault();
      
        if (this.state.email && this.state.name && this.state.userType){
          //if an admin is creating the account, they will submit a value for each attribute
          if (this.props.userType === "admin"){
            API.createUser({
              email: this.state.email,
              name: this.state.name,
              userType: this.state.userType,
              country: this.state.country,
              schoolId: this.state.school,
              committeeId: this.state.committee
            })
                .then(res => {
                  console.log(res)
                  this.setState({
                    recentName: res.data.name,
                    recentEmail: res.data.email,
                    email: "",
                    name: "",
                    userType: "delegate",
                    country: "",
                  })
                });
          }
          //if an advisor is creating the account, the will only submit certain values, the rest will be resolved in the route
          else{
            API.createUser({
              email: this.state.email,
              name: this.state.name,
              country: this.state.country,
              committeeId: this.state.committee
            })
                .then(res => {
                  console.log(res)
                  this.setState({
                    recentName: res.data.name,
                    recentEmail: res.data.email
                  })
                });
          }
          
        }
    }
    //handling submit for committee add
    handleAddCommittee = event =>{
      event.preventDefault()
      if (this.state.committeeAddInput){
        API.addCommittee({name: this.state.committeeAddInput})
          .then(res =>{
            console.log(res)
            this.setState({
              committeeAddInput: ""
            })
            this.getOptions()
          })
      }
    }
    handleAddSchool = event =>{
      event.preventDefault()
      if (this.state.schoolAddInput){
        API.addSchool({name: this.state.schoolAddInput})
          .then(res =>{
            console.log(res)
            this.setState({
              schoolAddInput: ""
            })
            this.getOptions()
          })
      }
    }
    render(){
        return(
          this.props.userType ==="admin" || this.props.userType ==="advisor"?
          <div>
            <form>
            <input
              value={this.state.email}
              onChange={this.handleInputChange}
              name="email"
              placeholder="email (required)"
            />
            <input
              value={this.state.name}
              onChange={this.handleInputChange}
              name="name"
              placeholder="name (first and last)"
            />
            {/* if the user is an admin, they can choose the user type of the user they are creating, otherwise they will create a delegate */}
            {this.props.userType ==="admin" ?  
              <select value={this.state.userType} onChange={this.handleInputChange} name="userType">
                <option value="admin">admin</option>
                <option value="advisor">advisor</option>
                <option value="staff">staff</option>
                <option value="delegate">delegate</option>
              </select> :  
              <div></div>}
            {/* if the user is an admin they can choose the school of the user they are creating, otherwise the school id will match */}
            {this.props.userType ==="admin" ? 
              <Select name="school"  options={this.state.schoolOptions} handleSelect={this.handleSelect} /> :
              <div></div>} 
            <Select name="committee"  options={this.state.committeeOptions} handleSelect={this.handleSelect} />
            <input
                value={this.state.country}
                onChange={this.handleInputChange}
                name="country"
                placeholder="country"
            />
            <button
                type="submit"
                name="createDelegate"
                onClick={this.handleFormSubmit}
            >Sign Up
            </button>
          </form>
            <div>
              <p>Account Created for {this.state.recentName}, email sent to {this.state.recentEmail}</p>
            </div>
            {this.props.userType ==="admin" ? 
            <div>
              <form>
                <input
                  value={this.state.committeeAddInput}
                  onChange={this.handleInputChange}
                  name="committeeAddInput"
                  placeholder="committee name"
                />
                <button
                  type="submit"
                  name="addCommittee"
                  onClick={this.handleAddCommittee}
                  > Add Committee
                </button>
              </form>
              <form>
                <input
                  value={this.state.schoolAddInput}
                  onChange={this.handleInputChange}
                  name="schoolAddInput"
                  placeholder="school name"
                />
                <button
                  type="submit"
                  name="addSchool"
                  onClick={this.handleAddSchool}
                  > Add School
                </button>
              </form>
            </div>:
              <form>
                <input
                  value={this.state.committeeAddInput}
                  onChange={this.handleInputChange}
                  name="committeeAddInput"
                  placeholder="committee name"
                />
                <button
                  type="submit"
                  name="addCommittee"
                  onClick={this.handleAddCommittee}
                  > Add Committee
                </button>
              </form>
            }
              
          </div>:
          <Redirect to="/"/>
        )
    }
   
}
export default CreateUser;