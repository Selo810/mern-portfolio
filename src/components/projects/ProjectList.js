import React, { Component } from 'react';
import Project from './Project';

class ProjectList extends Component {
  render() {
    
    let projectNodes = this.props.data.map(project => {
      return (
        <Project
          name={ project.name }
          uniqueID={ project['_id'] }
          key={ project.id } 
          image = { project.image } 
          descriptions = { project.descriptions }
          onProjectUpdate={ this.props.onProjectUpdate }
          onProjectDelete={ this.props.onProjectDelete }>
          
        </Project>
      )
    })
    return (
      <div>
        { projectNodes }
      </div>
    )
  }
}

export default ProjectList;
