import React, { Component } from 'react';
import Search from './Search';
import axios from 'axios';
import JobList from './JobList';

class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      searchInput: ''
    }
  }
  searchBooks = (event) => {
    event.preventDefault();
    axios.get(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=cf7beeb5&app_key=fbd2398ccb997db2e82c264fd919ceb0&results_per_page=10&what=delivery%20${this.searchInput}&location0=us&location1=new%20york`).then((data) => {
      // console.log(data);
      this.setState({ jobs: [...data.data.items] });
    }).catch((error) => console.log(error))
  }
    
  handleSearch = (event) => {
    
    event.preventDefault();
    const value = document.querySelector('.searchText').value;
    console.log(value);
    this.setState({ searchInput: value })
  }
  render() { 
    return ( 
      <React.Fragment>
        <Search searchJobs={this.searchJobs} handleSearch={this.handleSearch} />
        <JobList jobs={this.state.jobs} />
      </React.Fragment>
    )
  }
}
 
export default Job;