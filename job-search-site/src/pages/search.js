import React, { Component } from "react";
import { toast } from "react-toastify";
import Job from "../components/Job/index";
import SearchForm from "../components/SearchForm/index";
import { List } from "../components/List/index";
import API from "../utils/API";

class Search extends Component {
  state = {
    jobs: [],
    q: "",
    message: "Simply search for jobs via the Jobs Search"
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  getJobs = () => {
    API.getJobs(this.state.q)
      .then(res =>
        this.setState({
          jobs: res.data,
          currentPage: 1
        })
      )
      .catch(() => {
        toast.error("Your search did not match any job results");

        this.setState({
          jobs: [],
          message: "Your search did not match any job results",
          currentPage: 1
        });
      });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    toast.info("Searching jobs... !");
    this.getJobs();
  };

  handleJobSave = id => {
    const job = this.state.jobs.find(job => job.id === id);

    API.saveJob({
      adzunaId: job.id,
      title: job.volumeInfo.title,
      location: job.volumeInfo.location,
      link: job.volumeInfo.infoLink,
      description: job.volumeInfo.description,
      image: job.volumeInfo.imageLinks.thumbnail
    }).then(() => this.getJobs());
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 col-centered">
            <div className="d-flex flex-wrap flex-row bd-highlight mb-3 justify-content-center align-items-center">
              <div className="order-sm-2 p-2 bd-highlight">
                <img
                  className="image-250"
                  src="/images/JobSearch.jpg"
                  alt="Jobs Search"
                />
              </div>
              <div className="order-sm-1 p-2 bd-highlight">
                <h1 className="heading-title mx-sm-3 mb-2">
                  Jobs Search
                </h1>
                <h2 className="heading-subtitle mx-sm-3 mb-2">
                  Search for and Save Jobs of Interest
                </h2>
                <SearchForm
                  handleInputChange={this.handleInputChange}
                  handleFormSubmit={this.handleFormSubmit}
                  q={this.state.q}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-10 col-centered card-content mb-4">
            <h1 className="heading-title mx-sm-3 mb-2 text-center">Results</h1>

            {this.state.jobs.length ? (
              <List>
                {this.state.jobs.map(job => (
                  <Job
                  key={job.id}
                  title={job.volumeInfo.title}
                  location={job.volumeInfo.location}
                  link={job.volumeInfo.infoLink}
                  description={job.volumeInfo.description}
                  image={job.volumeInfo.imageLinks.thumbnail}
                    Button={() => (
                      <button
                        onClick={() => this.handleJobSave(job.id)}
                        className="btn save-button heading-subtitle ml-2"
                      >
                        Save
                      </button>
                    )}
                  />
                ))}
              </List>
            ) : (
              <div className="mockup-content">
                <h2 className="heading-title text-center">
                  {this.state.message}
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;