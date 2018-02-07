import React, { Component } from 'react';
import axios from 'axios';
import JobList from './JobList';
import JobForm from './JobForm';
import { firebase } from '../../firebase';

class JobBox extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [],
      authUser: null
     };
    this.loadJobsFromServer = this.loadJobsFromServer.bind(this);
    this.handleJobSubmit = this.handleJobSubmit.bind(this);
    this.handleJobUpdate = this.handleJobUpdate.bind(this);
    this.handleJobDelete = this.handleJobDelete.bind(this);
    this.pollInterval = null;
  }

  loadJobsFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({ data: res.data });
      })
  }

  handleJobSubmit(job) {
    let jobs = this.state.data;
    job.id = Date.now();
    let newJobs = jobs.concat([job]);
    this.setState({ data: newJobs });
    axios.post(this.props.url, job)
      .catch(err => {
        console.error(err);
        this.setState({ data: jobs });
      });
  }

  handleJobUpdate(id, job) {
    //sends the job id and new author/text to our api
    axios.put(`${this.props.url}/${id}`, job)
      .catch(err => {
        console.log(err);
      })
  }

  handleJobDelete(id) {
    axios.delete(`${this.props.url}/${id}`)
      .then(res => {
        console.log('Job deleted');
      })
      .catch(err => {
        console.error(err);
      });
  }


  componentDidMount() {
    this.loadJobsFromServer();
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadJobsFromServer, this.props.pollInterval)
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
  //once the JobBox is unmounted
  componentWillUnmount() {
  this.pollInterval && clearInterval(this.pollInterval);
  this.pollInterval = null;
}

  render() {
    return (
      <div className="container">
        <h3 class="center" id="jobs">
        WORK EXPERIENCE 
        { this.state.authUser
          ? <span><a class="waves-effect waves-light modal-trigger" href="#modal1"><i class="medium material-icons">add</i></a></span>
          : null
        }   
        
        </h3>
       <JobList data={ this.state.data } onJobUpdate={ this.handleJobUpdate } onJobDelete={ this.handleJobDelete }/>
       <JobForm onJobSubmit={ this.handleJobSubmit }/>
      </div>
    )
  }
}

export default JobBox;
