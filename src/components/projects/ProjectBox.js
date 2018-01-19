import React, { Component } from 'react';
import axios from 'axios';
import ProjectList from './ProjectList';
import ProjectForm from './ProjectForm';

class ProjectBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadProjectsFromServer = this.loadProjectsFromServer.bind(this);
    this.handleProjectSubmit = this.handleProjectSubmit.bind(this);
    this.handleProjectUpdate = this.handleProjectUpdate.bind(this);
    this.handleProjectDelete = this.handleProjectDelete.bind(this);
    this.pollInterval = null;
  }

  //Get projects from server
  loadProjectsFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({ data: res.data });
      })
  }

  //handle form submit 
  handleProjectSubmit(project) {
    let projects = this.state.data;
    project.id = Date.now();
    let newProjects = projects.concat([project]);
    this.setState({ data: newProjects });
    axios.post(this.props.url, project)
      .catch(err => {
        console.error(err);
        this.setState({ data: projects });
      });
  }

  handleProjectUpdate(id, project) {
    //sends the project id and new author/text to our api
    axios.put(`${this.props.url}/${id}`, project)
      .catch(err => {
        console.log(err);
      })
  }

  handleProjectDelete(id) {
    axios.delete(`${this.props.url}/${id}`)
      .then(res => {
        console.log('Project deleted');
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.loadProjectsFromServer();
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadProjectsFromServer, this.props.pollInterval)
    } 
  }

  //when incorporating into another project
  //(with react-router for instance),
  //this will prevent error messages every 2 seconds
  //once the ProjectBox is unmounted
  componentWillUnmount() {
  this.pollInterval && clearInterval(this.pollInterval);
  this.pollInterval = null;
}

  render() {
    return (
      <div className="container">
         <h3 class="center" id="projects">
        PROJECTS / ACHIEVEMENTS
        <span>
            <a class="waves-effect waves-light modal-trigger" href="#modal2"><i class="medium material-icons">add</i></a>
        </span>
        </h3>
        <div class="row">
       <ProjectList 
            data={ this.state.data } 
            onProjectUpdate={ this.handleProjectUpdate } 
            onProjectDelete={ this.handleProjectDelete }/>
       </div>
       <ProjectForm onProjectSubmit={ this.handleProjectSubmit }/>
       </div>
       
     
    )
  }
}

export default ProjectBox;
