import React, { Component } from 'react';
import axios from 'axios';
import SkillList from './SkillList';
import SkillForm from './SkillForm';
import { firebase } from '../../firebase';

class SkillBox extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        data: [],
        authUser: null
       };
    this.loadSkillsFromServer = this.loadSkillsFromServer.bind(this);
    this.handleSkillSubmit = this.handleSkillSubmit.bind(this);
    this.handleSkillUpdate = this.handleSkillUpdate.bind(this);
    this.handleSkillDelete = this.handleSkillDelete.bind(this);
    this.pollInterval = null;
  }

  loadSkillsFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({ data: res.data });
      })
  }

  //handle form submit 
  handleSkillSubmit(skill) {
    let skills = this.state.data;
    skill.id = Date.now();
    let newSkills = skills.concat([skill]);
    this.setState({ data: newSkills });
    axios.post(this.props.url, skill)
      .catch(err => {
        console.error(err);
        this.setState({ data: skills });
      });
  }

  handleSkillUpdate(id, skill) {
    //sends the skill id and new author/text to our api
    axios.put(`${this.props.url}/${id}`, skill)
      .catch(err => {
        console.log(err);
      })
  }

  handleSkillDelete(id) {
    axios.delete(`${this.props.url}/${id}`)
      .then(res => {
        console.log('Skill deleted');
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.loadSkillsFromServer();
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadSkillsFromServer, this.props.pollInterval)
    } 

    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  //when incorporating into another project
  //(with react-router for instance),
  //this will prevent error messages every 2 seconds
  //once the CommentBox is unmounted
  componentWillUnmount() {
  this.pollInterval && clearInterval(this.pollInterval);
  this.pollInterval = null;
}

  render() {
    return (
      <div className="container">
        <h3 class="center" id="skills">
        SKILLS

        { this.state.authUser
          ? <span><a class="waves-effect waves-light modal-trigger" href="#modal3"><i class="medium material-icons">add</i></a></span>
          : null
        }
        </h3>
        <div class="row">
       <SkillList 
          data={ this.state.data } 
          onSkillUpdate={ this.handleSkillUpdate }
          onSkillDelete={ this.handleSkillDelete }/>
       </div>
       <SkillForm onSkillSubmit={ this.handleSkillSubmit }/>
      </div>
    )
  }
}

export default SkillBox;
