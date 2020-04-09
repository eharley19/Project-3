import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import RegistrationForm from "../RegistrationForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

class NavBar extends Component {
  state = {
    modalOpen: false,
  };

  handleModalOpen = () => {
    this.setState((prevState) => {
      return {
        modalOpen: !prevState.modalOpen,
      };
    });
  };
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link className="navbar-brand brand-titles" to="#">
            Workers4Covid
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link heading-titles" to="/search">
                  SEARCH
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link heading-titles" to="/saved">
                  SAVED
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link heading-titles" to="/search">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <a onClick={this.handleModalOpen} className="nav-link">
                  Register
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <RegistrationForm
          modalOpen={this.state.modalOpen}
          handleModalOpen={this.handleModalOpen}
        />
      </React.Fragment>
    );
  }
}

export default NavBar;
