import React, { Component } from 'react';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
                name: '',
                email: '',
                message: '',
                };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

 this.setState({
   [name]: value
 });

 }

  handleSubmit(e) {
    e.preventDefault();
    let name = this.state.name.trim();
    let email = this.state.email.trim();
    let message = this.state.message.trim();

    if (!name || !email || !message) {
      return;
    }
    this.props.onEmailSubmit({ 
        name: name, 
        email: email,
        message: message,
    });
    this.setState({ 
        name: '',
        email: '',
        message: '',
        });
  }
  
  render() {
    return (
        
        <div class="row">
            <form class="col s12" onSubmit={this.handleSubmit}>
            <div class="row">
                <div class="input-field col s6">
                <input placeholder="Project Name" id="name" name="name" type="text" class="validate" onChange={this.handleChange}/>
                <label for="name">Full Name</label>
                </div>
                <div class="input-field col s6">
                <input placeholder="Email" id="email" name="image" type="email" class="validate" onChange={this.handleChange}/>
                <label for="image">Email</label>
                </div>
            </div>

            <div class="row">
                <div class="input-field col s12">
                <textarea id="message" name="message" class="materialize-textarea" onChange={this.handleChange}></textarea>
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
