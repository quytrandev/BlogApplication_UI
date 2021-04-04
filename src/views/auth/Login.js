import React, { Component } from 'react'
import { withCookies } from "react-cookie";
import ToastifyMessage from '../../ToastifyMessage';
import history from './../../history'
//service
import AuthService from '../../services/AuthService';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      prevPath: "",
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
    this.validateData(this.state.email, this.state.password)
  }

  //methods
  async validateData(email, password) {
    if (email.length === 0 || password.length === 0) {
      ToastifyMessage.Error("Username or password cannot be empty");
    }
    else {
      await this.login(email, password);
    }
  }

  setCookiesOnLogin(userId, email, token) {
    const { cookies } = this.props;
    cookies.set("userId", userId, { path: "/", maxAge: 1200 });
    cookies.set("email", email, { path: "/", maxAge: 1300 });
    cookies.set("token", token, { path: "/", maxAge: 1200 });
    console.log("user access cookie token: " + cookies.get("token"));
    return cookies.get("newComer");
  }

  login(email, password) {
    AuthService.Login(email, password).then((response) => {
      if (response.status === 200) {
        if (response.data.accessToken !== undefined) {
          const userId = response.data.userId;
          const email = response.data.email;
          const token = response.data.accessToken;
          const isNewComer = this.setCookiesOnLogin(userId, email, token);
          ToastifyMessage.Success("Successfully logged in");

          setTimeout(() => {
            if (isNewComer != null) {
              console.log("new comer");
              history.push("/");
            } else {
              console.log("old member");
              history.goBack();
            }
          }, 1500);
        }
        else {
          const message = response.data.message;
          ToastifyMessage.Error(message, "yes");
        }
      }
    });
  }

  render() {
    return (
      <div className="row container-fluid my-4">
        <div className="col-md-3"></div>
        <div className="col-md-6 card bg-light ml-3">
          <div className="card-body">
            <h4 className="card-title mt-3 text-center">Login</h4>
            <p className="text-center">Login using your account</p>
            <hr />
            <form method="post" onSubmit={this.handleSubmit}>
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
              <div className="form-group ">
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </div>
              <p className="text-center">
                Don't have an account? <a href="/register">Register</a>{" "}
              </p>
            </form>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}

export default withCookies(Login);