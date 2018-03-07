import React, { Component } from 'react';
import marked from 'marked';
import { firebase } from '../../firebase';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
      toBeUpdated: false,
      ...props.e
    };

    this.updateProject = this.updateProject.bind(this);
    this.handleProjectUpdate = this.handleProjectUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    
    
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  updateProject(e) {
    e.preventDefault();
    //brings up the update field when we click on the update link.
    this.setState({ toBeUpdated: !this.state.toBeUpdated });
  }

  handleProjectUpdate(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    //if job fields changed, set it. if not, leave null and our PUT request
    //will ignore it.
    let name = (this.state.name) ? this.state.name : null;
    let descriptions = (this.state.descriptions) ? this.state.descriptions : null;
    let image = (this.state.image) ? this.state.image : null;
  
    let project = { name: name, descriptions: descriptions, image: image};
    this.props.onProjectUpdate(id, project);
    
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      name: '',
      descriptions: '',
      image: ''
    })
  }


  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

 this.setState({
   [name]: value
 });

 }

 deleteProject(e) {
  e.preventDefault();
  let id = this.props.uniqueID;
  this.props.onProjectDelete(id);
  console.log('oops deleted');
}

  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  
  render() {
    return (
      <div className="project">
      <div class="col s12" >
      <div class="card horizontal">
        <div class="card-image">
          <img style={{ height: 250 }} src={this.props.image}/>
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <h4>{this.props.name}</h4>
            <p>{this.props.descriptions}</p>
          </div>
          <div class="card-action">
              { this.state.authUser
              ? <span><a href="#!" class="secondary-content" onClick={ this.updateProject }><i class="material-icons">mode_edit</i></a>
              <a href="#!" class="right" onClick={ this.deleteProject }><i class="material-icons">mode_delete</i></a></span>
              : null
              }    
          </div>
      </div>
      </div>
      </div>

      { (this.state.toBeUpdated)
          ? (<form class="col s12" onSubmit={this.handleProjectUpdate}>
            <div class="row">
                <div class="input-field col s6">
                <input 
                  placeholder="Project Name" 
                  id="name" name="name" 
                  type="text" 
                  class="validate" 
                  onChange={this.handleChange}
                  defaultValue={this.props.name}
                  />
                <label class="active" for="name">Project Name</label>
                </div>
                <div class="input-field col s6">
                <input 
                  placeholder="Image" 
                  id="image" 
                  name="image" 
                  type="text" class="validate" 
                  onChange={this.handleChange}
                  defaultValue={this.props.image}
                  />
                <label class="active" for="image">Image</label>
                </div>
            </div>

            <div class="row">
                <div class="input-field col s12">
                <textarea 
                  id="descriptions" 
                  name="descriptions" 
                  class="materialize-textarea" 
                  onChange={this.handleChange}
                  defaultValue={this.props.descriptions}>
                  </textarea>
                <label class="active" for="descriptions">Job Descriptions</label>
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

export default Project;
