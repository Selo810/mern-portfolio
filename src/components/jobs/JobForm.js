import React, { Component } from 'react';

class JobForm extends Component {
  constructor(props) {
    super(props);
    this.state = {...props.e};

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
    let job_title = this.state.job_title.trim();
    let company_name = this.state.company_name.trim();
    let city = this.state.city.trim();
    let state = this.state.state.trim();
    let descriptions = this.state.descriptions.trim();
    let image = this.state.image.trim();
    let start_date = this.state.start_date.trim();
    let end_date = this.state.end_date.trim();
    if (!job_title || !company_name) {
      return;
    }
    this.props.onJobSubmit({ 
        job_title: job_title, 
        company_name: company_name, 
        city: city, 
        state: state, 
        descriptions: descriptions,
        image: image,
        start_date: start_date,
        end_date: end_date
    });
    this.setState({ 
        job_title: '',
        company_name: '',
        city: '',
        state: '',
        descriptions: '',
        image: '',
        start_date: '',
        end_date: ''
        });
  }
  
  render() {
    return (
        <div id="modal1" class="modal bottom-sheet">
        <div class="modal-content container">
        <h4 class="center">Add Work Experience</h4>
        <div class="row">
            <form class="col s12" onSubmit={this.handleSubmit}>
            <div class="row">
                <div class="input-field col s6">
                <input placeholder="Job Title" id="job_title" name="job_title" type="text" class="validate" onChange={this.handleChange}/>
                <label for="job_title">Job Title</label>
                </div>
                <div class="input-field col s6">
                <input placeholder="Company Name" id="company_name" name="company_name" type="text" class="validate" onChange={this.handleChange}/>
                <label for="company_name">Company Name</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                <input placeholder="City" id="city" name="city" type="text" class="validate" onChange={this.handleChange}/>
                <label for="city">City</label>
                </div>
                <div class="input-field col s6">
                <input placeholder="State" id="state" name="state" type="text" class="validate" onChange={this.handleChange}/>
                <label for="company_name">State</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                <input placeholder="Start Date" id="start_date" name="start_date" type="text" class="validate" onChange={this.handleChange}/>
                <label for="start_date">Start Date</label>
                </div>
                <div class="input-field col s6">
                <input placeholder="End Date" id="end_date" name="end_date" type="text" class="validate" onChange={this.handleChange}/>
                <label for="end_date">End Date</label>
                </div>
            </div>

            <div class="row">
                <div class="input-field col s6">
                <input placeholder="Image" id="image" name="image" type="text" class="validate" onChange={this.handleChange}/>
                <label for="image">Image</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                <textarea id="descriptions" name="descriptions" class="materialize-textarea" onChange={this.handleChange}></textarea>
                <label for="descriptions">Job Descriptions</label>
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

export default JobForm;
