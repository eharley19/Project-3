import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import RegistrationForm from "../RegistrationForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import LoginModal from "../LoginModal";

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

  handleModal2Open = () => {
    this.setState((prevState) => {
      return {
        modal2Open: !prevState.modal2Open,
      };
    });
  };
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link style={{ width: 375 }} className="brand-titles" to="/">
            COVID WARRIORS
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
          <div
            style={{ width: 335 }}
            className="collapse navbar-collapse"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link heading-titles" to="/search">
                  Jobs
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link heading-titles" to="/saved">
                  Saved
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link heading-titles" to="/profile">
                  Profile
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  onClick={this.handleModal2Open}
                  className="nav-link heading-titles"
                >
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a
                  onClick={this.handleModalOpen}
                  className="nav-link heading-titles"
                >
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
        <LoginModal
          modalOpen={this.state.modal2Open}
          handleModal2Open={this.handleModal2Open}
        />
      </React.Fragment>
    );
  }
}

export default NavBar;
