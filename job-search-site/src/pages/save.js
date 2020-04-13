import React, { Component } from "react";
import { toast } from "react-toastify";
import { List } from "../components/List/index";
import Job from "../components/Job/index";
import API from "../utils/API";

class Saved extends Component {
  state = {
    jobs: [],
  };

  componentDidMount() {
    this.getJobs();
  }

  getJobs = () => {
    API.getSavedJobs()
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

  handleJobDelete = async (id) => {
    const originalJobs = this.state.jobs;
    try {
      await API.deleteJob(id).then((res) => this.getJobs());
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This job has been deleted");
      this.setState({ jobs: originalJobs });
    }
  };

  render() {
    const { length: count } = this.state.jobs;
    return (
      <div className="container">
        <div className="row">
          <div className="col-8 col-centered">
            <div className="d-flex flex-row bd-highlight mb-3 justify-content-center align-items-center">
              <div className="p-2 bd-highlight">
                <img
                  className="image-250"
                  src="/images/jobs.jpg"
                  alt="Jobs Search"
                />
              </div>
              <div className="p-2 bd-highlight">
                <h1 className="heading-title mx-sm-3 mb-2">Job Search</h1>

                <h2 className="heading-subtitle mx-sm-3 mb-2 text-center">
                  Showing {count} jobs in your Library
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8 col-centered card-content">
            {this.state.jobs.length ? (
              <List>
                {this.state.jobs.map((job) => (
                  <Job
                    key={job._id}
                    title={job.title}
                    link={job.redirect_url}
                    company={job.company}
                    contract_time={job.contract_time}
                    location={job.location}
                    description={job.description}
                    Button={() => (
                      <button
                        onClick={() => this.handleJobDelete(job._id)}
                        className="btn delete-button heading-subtitle ml-2"
                      >
                        Delete
                      </button>
                    )}
                  />
                ))}
              </List>
            ) : (
              <div className="mockup-content">
                <h2 className="brand-title text-center">
                  No saved jobs in your Library
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Saved;
