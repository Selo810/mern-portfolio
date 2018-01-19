import React, { Component } from 'react';
import Job from './Job';

class JobList extends Component {
  render() {
    let jobNodes = this.props.data.map(job => {
      return (
        <Job
          job_title={ job.job_title }
          uniqueID={ job['_id'] }
          key={ job.id } 
          company_name = { job.company_name } 
          image = { job.image }
          city = { job.city } 
          state = { job.state }
          descriptions = { job.descriptions } 
          start_date = { job.start_date }
          end_date = { job.end_date } 
          onJobUpdate ={ this.props.onJobUpdate }
          onJobDelete ={ this.props.onJobDelete }
           >
        </Job>
      )
    })
    return (
      <div>
        { jobNodes }
      </div>
    )
  }
}

export default JobList;
