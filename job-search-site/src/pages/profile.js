import React, { Component } from "react";
import axios from "axios";
import { Progress } from "reactstrap";
import { toast } from "react-toastify";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0,
    };
  }

  onChangeHandler = (event) => {
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  };

  onClickHandler = () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    console.log(this.state.selectedFile);
    axios
      .post("http://localhost:3001/upload", data, {
        // receive two parameter endpoint url ,form data
        onUploadProgress: (ProgressEvent) => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
          });
        },
      })
      .then((res) => {
        // then print response status
      })
      .then((res) => {
        toast.success("upload success");
      })
      .catch((err) => {
        toast.error("upload fail");
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="profile-title">Profile</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <h5 className="profile-content">Your Resume:</h5>
          </div>
          <div className="col-9">
            {this.state.selectedFile && this.state.loaded > 0 && (
              <h6>{this.state.selectedFile.name}</h6>
            )}
            <form method="post" action="#" id="#">
              <div className="form-group files">
                <label className="profile-label">Upload Your File </label>
                <input
                  type="file"
                  className="form-control"
                  multiple=""
                  onChange={this.onChangeHandler}
                />
              </div>
            </form>
            <div class="form-group">
              <Progress max="100" color="info" value={this.state.loaded}>
                {Math.round(this.state.loaded, 2)}%
              </Progress>
            </div>
            <button
              type="button"
              className="btn btn-info btn-block"
              onClick={this.onClickHandler}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
