import React, { Component } from "react";
import { toast } from "react-toastify";
import { List } from "../components/List/index";
import Job from "../components/Job/index";
import API from "../utils/API";

class Saved extends Component {
  state = {
    jobs: []
  };

  componentDidMount() {
    this.getSavedJobs();
  }

  getSavedJobs = () => {
    API.getSavedJobs()
      .then(res =>
        this.setState({
          jobs: res.data
        })
      )
      .catch(err => console.log(err));
  };

  handleJobDelete = async id => {
    const originalJobs = this.state.jobs;
    try {
      await API.deleteJob(id).then(res => this.getSavedJobs());
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
                <h1 className="heading-title mx-sm-3 mb-2">
                  Job Search
                </h1>

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
                {this.state.jobs.map(book => (
                  <Job
                    key={book._id}
                    title={book.title}
                    location={book.location}
                    link={book.link}
                    description={book.description}
                    image={book.image}
                    Button={() => (
                      <button
                        onClick={() => this.handleJobDelete(book._id)}
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