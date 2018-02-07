import React, { Component } from 'react';
import marked from 'marked';
import { firebase } from '../../firebase';

class Skill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
      toBeUpdated: false,
      ...props.e
    };

    this.updateSkill = this.updateSkill.bind(this);
    this.handleSkillUpdate = this.handleSkillUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
    
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  updateSkill(e) {
    e.preventDefault();
    //brings up the update field when we click on the update link.
    this.setState({ toBeUpdated: !this.state.toBeUpdated });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

 this.setState({
   [name]: value
 });

 }

 handleSkillUpdate(e) {
  e.preventDefault();
  let id = this.props.uniqueID;
  //if job fields changed, set it. if not, leave null and our PUT request
  //will ignore it.
  let name = (this.state.name) ? this.state.name : null;
  let image = (this.state.image) ? this.state.image : null;

  let skill = { name: name, image: image};
  this.props.onSkillUpdate(id, skill);
  
  this.setState({
    toBeUpdated: !this.state.toBeUpdated
  })
}

deleteSkill(e) {
  e.preventDefault();
  let id = this.props.uniqueID;
  this.props.onSkillDelete(id);
  console.log('oops deleted');
}

  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  
  render() {
    return (
      <div>
        <div class="col s2" >
        
        <div class="chip">
          <img src={this.props.image}/>
          {this.props.name}

          { this.state.authUser
          ? <span>
            <a href="#!" class="secondary-content" onClick={ this.updateSkill }>
            <i class="material-icons">mode_edit</i>
            </a>
          </span>
          : null
          }  
          
        </div>
        { this.state.authUser
          ? <a href="#!" class="right" onClick={ this.deleteSkill }><i class="material-icons">mode_delete</i></a>
          : null
          } 
        
        </div>
        { (this.state.toBeUpdated)
          ? (<form class="col s12" onSubmit={this.handleSkillUpdate}>
            <div class="row">
                <div class="input-field col s6">
                <input 
                  placeholder="Project Name" 
                  id="name" 
                  name="name" 
                  type="text" 
                  class="validate" 
                  onChange={this.handleChange}
                  defaultValue={this.props.name}/>
                <label class="active" for="name">Project Name</label>
                </div>
                <div class="input-field col s6">
                <input 
                  placeholder="Image" 
                  id="image" 
                  name="image" 
                  type="text" 
                  class="validate" 
                  onChange={this.handleChange}
                  defaultValue={this.props.image}/>
                <label class="active" for="image">Image</label>
                </div>
            </div>
            <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                <i class="material-icons right">send</i>
            </button>
            </form>)
          : null}

      </div>
    )
  }
}

export default Skill;
