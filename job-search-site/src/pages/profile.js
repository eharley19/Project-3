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
      user: null,
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    axios
      .get("http://localhost:8000/api/users/login")
      .then((res) => {
        console.log("User:", res.data);
        this.setState({
          user: res.data,
        });
        console.log("Username:", this.state.user[0].username);
      })
      .catch(() => {
        this.setState({
          user: [],
          message: "Your search did not match any user results",
          currentPage: 1,
        });
      });
  };

  onChangeHandler = (event) => {
    var files = event.target.files[0];
    if (this.checkMimeType(event) && this.checkFileSize(event)) {
      // if return true allow to setState
      this.setState({
        selectedFile: files,
      });
    }
  };

  onClickHandler = () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    axios
      .post("http://localhost:8000/upload", data, {
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

  checkMimeType = (event) => {
    //getting file object
    let files = event.target.files;
    //define message container
    let err = "";
    // list allow mime type
    const types = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    // compare file type find doesn't matach
    if (types.every((type) => files[0].type !== type)) {
      // create error message and assign to container
      err += files[0].type + " is not a supported format\n";
    }

    if (err !== "") {
      // if message not same old that mean has error
      event.target.value = null; // discard selected file

      //  create toast massage

      toast.error(err);

      return false;
    }

    return true;
  };

  checkFileSize = (event) => {
    let files = event.target.files;
    let size = 1050000;
    let err = "";
    if (files[0].size > size) {
      err += files[0].type + "is too large, please pick a smaller file\n";
    }

    if (err !== "") {
      event.target.value = null;
      toast.error(err);
      return false;
    }

    return true;
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="profile-title">Profile</h2>
          </div>
        </div>
        {this.state.user && (
          <div>
            <div className="row">
              <div className="col-3">
                <h5 className="profile-content">Username:</h5>
              </div>
              <div className="col-9">
                <h5 className="profile-content">
                  {this.state.user[0].username}
                </h5>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <h5 className="profile-content">Password:</h5>
              </div>
              <div className="col-9">
                <h5 className="profile-content">*************</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <h5 className="profile-content">Name:</h5>
              </div>
              <div className="col-9">
                <h5 className="profile-content">{this.state.user[0].name}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <h5 className="profile-content">Email:</h5>
              </div>
              <div className="col-9">
                <h5 className="profile-content">{this.state.user[0].email}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <h5 className="profile-content">Phone number:</h5>
              </div>
              <div className="col-9">
                <h5 className="profile-content">
                  {this.state.user[0].phoneNum}
                </h5>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <h5 className="profile-content">Your Resume:</h5>
              </div>
              <div className="col-9">
                {this.state.selectedFile && this.state.loaded === 100 && (
                  <h5 className="profile-content">
                    {this.state.selectedFile.name}
                  </h5>
                )}
                <form method="post" action="#" id="#">
                  <div className="form-group files">
                    <label className="profile-label">Upload Your File </label>
                    <small id="uploadHelp" className="form-text text-muted">
                      Please submit your resume as a Word document, a PDF file
                      or a TXT file under 1MB.
                    </small>
                    <input
                      type="file"
                      className="form-control"
                      multiple=""
                      onChange={this.onChangeHandler}
                    />
                  </div>
                </form>
                <div className="form-group">
                  <Progress
                    animated
                    max="100"
                    color="info"
                    value={this.state.loaded}
                  >
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
        )}
      </div>
    );
  }
}

export default Profile;
