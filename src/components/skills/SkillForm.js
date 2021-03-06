import React, { Component } from 'react';

class SkillForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //...props.e
    };

    this.handleChange = this.handleChange.bind(this);
    //this.handleAuthorChange = this.handleAuthorChange.bind(this);
    //this.handleTextChange = this.handleTextChange.bind(this);
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
    let image = this.state.image.trim();

    if (!name || !image) {
      return;
    }
    this.props.onSkillSubmit({ 
        name: name, 
        image: image,
    });
    this.setState({ });
  }
  
  render() {
    return (
        <div id="modal3" class="modal bottom-sheet">
        <div class="modal-content container">
        <h4 class="center">Add Skill</h4>
        <div class="row">
            <form class="col s12" onSubmit={this.handleSubmit}>
            <div class="row">
                <div class="input-field col s6">
                <input placeholder="Project Name" id="name" name="name" type="text" class="validate" onChange={this.handleChange}/>
                <label for="name">Project Name</label>
                </div>
                <div class="input-field col s6">
                <input placeholder="Image" id="image" name="image" type="text" class="validate" onChange={this.handleChange}/>
                <label for="image">Image</label>
                </div>
            </div>
            <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                <i class="material-icons right">send</i>
            </button>
            </form>
        </div>
        </div>
        
        </div>
    )
  }
}

export default SkillForm;
