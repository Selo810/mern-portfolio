import React, { Component } from 'react';
import axios from 'axios';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        name: '',
        email: '',
        message: '',
        feedback: '',
        errors: {}
        };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearFeedback = this.clearFeedback.bind(this);
  }

  handleValidation(){
    let errors = {};
    let formIsValid = true;

            //Name
    if(!this.state.name){
        formIsValid = false;
        errors["name"] = "Name is required";
    }
    
    /*if(typeof this.state.name !== "undefined"){
        if(!this.state.name.match(/^[a-zA-Z]+$/)){
        formIsValid = false;
        errors["name"] = "Only letters";
        }      	
    }*/
    
    //Email
    if(!this.state.email){
        formIsValid = false;
        errors["email"] = "Email is required";
    }
    
    if(typeof this.state.email !== "undefined"){
        let lastAtPos = this.state.email.lastIndexOf('@');
        let lastDotPos = this.state.email.lastIndexOf('.');

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
            formIsValid = false;
            errors["email"] = "Email is not valid";
        }
    }

    this.setState({errors: errors});
    return formIsValid;
}

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
    [name]: value
    });

 }


  async handleSubmit(e) {
    e.preventDefault();
        
            if(this.handleValidation()){
                const {name, email, message} = this.state

                //const form = await axios.post('http://localhost:3001/api/contact-form', {
                axios.post('http://ec2-35-171-189-137.compute-1.amazonaws.com:9000/api/contact-form', {
                    name,
                    email,
                    message
                });
                
                this.setState({ 
                    name: '',
                    email: '',
                    message: '',
                    feedback: 'THANKS FOR CONTACTING ME. \nI WILL GET BACK TO YOU ASAP!'
                    });

                    setTimeout(this.clearFeedback, 3000);
 
            }else{
                //alert("Form has errors.")
            }
        
  }

  //reset feedback
  clearFeedback(){
    this.setState({ 
        feedback: ''
        });
  }
  
  render() {
   
    return (
        
        <div class="row">
            <p class="center" style={{color: "green"}}>{this.state.feedback}</p>
            <form ref="form" class="col s12" onSubmit={this.handleSubmit}>
            
            <div class="row">
                <div class="input-field col s6">
                
                <input 
                    id="name" 
                    name="name" 
                    type="text" 
                    class="validate" 
                    value={this.state.name}
                    onChange={this.handleChange}/>
                    <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                <label for="name">Full Name</label>
                </div>
                <div class="input-field col s6">
                <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    class="validate" 
                    value={this.state.email}
                    onChange={this.handleChange}/>
                    <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                <label for="image">Email</label>
                </div>
            </div>

            <div class="row">
                <div class="input-field col s12">
                <textarea 
                    id="message" 
                    name="message" 
                    class="materialize-textarea" 
                    value={this.state.message}
                    onChange={this.handleChange}>
                    </textarea>
                <label for="message">Your Message</label>
                </div>
            </div>
            <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                <i class="material-icons right">send</i>
            </button>
            </form>
        </div>
    )
  }
}

export default ContactForm;
