import React, { Component } from 'react'
import history from './../../history'
import ToastifyMessage from './../../ToastifyMessage';
//service
import AuthService from '../../services/AuthService';
import CookiesService from '../../services/CookiesService';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      displayName: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //event handler
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.validateData(
      this.state.email,
      this.state.displayName,
      this.state.password,
      this.state.confirmPassword
    );
  }

  //methods
  async register(email, password, displayName) {
    const response = await AuthService.Register(email, password, displayName);
    if (response.data.isSuccess) {
      ToastifyMessage.Success(response.data.message);
      CookiesService.setCookieWithDuration("newComer", "yes", 150);
      history.push("/login");
    }
    else {
      ToastifyMessage.Error(response.data.message, "yes");
    }
  }

  async validateData(email, displayName, password, confirmPassword) {
    if (email.length === 0 ||
      displayName.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      ToastifyMessage.Error("Fields cannot be empty", "yes");
    }
    else {
      if (password !== confirmPassword) {
        ToastifyMessage.Error("Password does not match", "yes");
      }
      else {
        await this.register(email, password, displayName);
      }
    }
  }

  render() {
    return (
      <div className="row container-fluid my-4">
        <div className="col-md-3"></div>
        <div className="col-md-6 card bg-light ml-3">
          <div className="card-body">
            <h4 className="card-title mt-3 text-center">Create Account</h4>
            <p className="text-center">Get started with your free account</p>
            <hr />
            <form onSubmit={this.handleSubmit}>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-envelope"></i>{" "}
                  </span>
                </div>
                <input
                  value={this.state.email}
                  onChange={this.handleChange}
                  name="email"
                  className="form-control"
                  placeholder="Email address"
                  type="email"
                />
              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-user"></i>{" "}
                  </span>
                </div>
                <input
                  value={this.state.displayName}
                  onChange={this.handleChange}
                  name="displayName"
                  className="form-control"
                  placeholder="Display name"
                  type="text"
                />
              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-lock"></i>{" "}
                  </span>
                </div>
                <input
                  value={this.state.password}
                  onChange={this.handleChange}
                  name="password"
                  className="form-control"
                  placeholder="Input your password"
                  type="password"
                />
              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-lock"></i>{" "}
                  </span>
                </div>
                <input
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm your password"
                  type="password"
                />
              </div>
              <div className="form-group ">
                <button type="submit" className="btn btn-primary btn-block">
                  {" "}
                  Create Account{" "}
                </button>
              </div>
              <p className="text-center">
                Have an account? <a href="/login">Log In</a>{" "}
              </p>
            </form>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}
