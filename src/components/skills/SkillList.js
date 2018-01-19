import React, { Component } from 'react';
import Skill from './Skill';

class SkillList extends Component {
  render() {
    let skillNodes = this.props.data.map(skill => {
      return (
        <Skill
          name={ skill.name }
          uniqueID={ skill['_id'] }
          key={ skill.id } 
          image = { skill.image }
          onSkillUpdate={ this.props.onSkillUpdate }
          onSkillDelete={ this.props.onSkillDelete }>
        </Skill>
      )
    })
    return (
      <div>
        { skillNodes }
      </div>
    )
  }
}

export default SkillList;
