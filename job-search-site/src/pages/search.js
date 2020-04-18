import React, { Component } from "react";
import { toast } from "react-toastify";
import Job from "../components/Job/index";
import SearchForm from "../components/SearchForm/index";
import { List } from "../components/List/index";
import API from "../utils/API";
import LoginModal from "../components/LoginModal";

import "./style.css";

class Search extends Component {
  state = {
    jobs: [],
    where: "",
    what: "",
    message: "Search for Jobs Above",
    modal2Open: false,
  };

  handleInputChangeJob = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleInputChangeLocation = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  getJobs = () => {
    API.getJobs(this.state.what, this.state.where)
      .then((res) => {
        this.setState({
          jobs: res.data,
          currentPage: 1,
        });
      })
      .catch(() => {
        toast.error("Your search did not match any job results");

        this.setState({
          jobs: [],
          message: "Your search did not match any job results",
          currentPage: 1,
        });
      });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    toast.info("Searching jobs... !");
    this.getJobs();
  };

  handleModal2Open = () => {
    this.setState((prevState) => {
      return {
        modal2Open: !prevState.modal2Open,
      };
    });
  };

  handleJobSave = (id) => {
    if (localStorage.auth_token) {
      const job = this.state.jobs.find((job) => job.id === id);
      API.getSavedJobs().then((res) => {
        const savedJobs = res.data;
        if (savedJobs.find((jobSaved) => jobSaved.adzunaId === id)) {
          alert("Job already Saved!");
        } else {
          API.saveJob({
            adzunaId: job.id,
            title: job.title,
            location: job.location.display_name,
            link: job.redirect_url,
            description: job.description,
            company: job.company.display_name,
          }).then(() => this.getJobs());
        }
      });
    } else {
      console.log("Open Sesame!");
      this.handleModal2Open();
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 col-centered">
            <div className="d-flex flex-wrap flex-row bd-highlight mb-3 justify-content-center align-items-center">
              <div
                className="order-sm-2 p-2 bd-highlight"
                style={{ marginBottom: 35, marginTop: -15 }}
              >
                <img
                  className="image-250"
                  src="/images/JOBLOGO.jpg"
                  alt="Jobs Search"
                />
              </div>
              <div className="order-sm-1 p-2 bd-highlight">
                <h1 className="heading-title mx-sm-3 mb-2"></h1>
                <h2
                  className="heading-title mx-sm-7 mb-7"
                  className="mx-auto"
                  style={{
                    width: 500,
                    marginBottom: 35,
                    marginTop: 25,
                  }}
                >
                  Search and Help Fight COVID-19
                </h2>
                <SearchForm
                  handleInputChangeJob={this.handleInputChangeJob}
                  handleInputChangeLocation={this.handleInputChangeLocation}
                  handleFormSubmit={this.handleFormSubmit}
                  where={this.state.where}
                  what={this.state.what}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div
            className="col-10 col-centered card-content mb-4"
            style={{ backgroundColor: "rgb(22, 17, 70)" }}
          >
            <h1 className="heading-title mx-sm-3 mb-2 text-center">Results</h1>

            {this.state.jobs.length ? (
              <List>
                {this.state.jobs.map((job) => (
                  <Job
                    key={job.id}
                    title={job.title}
                    link={job.redirect_url}
                    company={job.company.display_name}
                    contract_time={job.contract_time}
                    location={job.location.display_name}
                    description={job.description}
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
        <LoginModal
          modalOpen={this.state.modal2Open}
          handleModal2Open={this.handleModal2Open}
        />
      </div>
    );
  }
}

export default Search;
