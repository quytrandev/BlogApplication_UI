import React, { Component } from 'react'
import { withCookies } from "react-cookie";
//services
import CookiesService from '../services/CookiesService';
import APIService from '../services/APIService';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      isLoggedIn: false,
      username: this.props.cookies.get('email'),
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  async checkLoginUser(accessToken) {
    await APIService.GETUrlWithHeader(
      "/User/Ping",
      accessToken
    ).then((response) => {
      if (response.status === 200 && response.data === "pong") {
        this.setState({ isLoggedIn: true, username: this.props.cookies.get('email') });
      }
    })
  }

  componentDidMount() {
    const accessToken = CookiesService.getAccessToken();
    if (accessToken !== undefined) {
      this.checkLoginUser(accessToken);
    }

  }

  handleLogout() {
    CookiesService.removeCookiesOnLoggingOut();
    this.setState({ isLoggedIn: false });
    //history.push("/");   
  }

  renderLoggedInHeader(username) {
    return (
      <nav className="navbar sticky-top navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom shadow mb-3">
        <div className="container">
          <a href="/" className="navbar-brand  pb-2">
            WonderBlog
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="navbar-collapse"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
            <div>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a href="/profile" className="nav-link text-dark">
                    Welcome {username}
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    onClick={this.handleLogout}
                    href="/"
                    className="nav-link text-dark"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
            <ul className="navbar-nav flex-grow-1">
              <li className="nav-item">
                <a href="/" className="nav-link text-dark">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="/myblog" className="nav-link text-dark">
                  My blog
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  renderDefaultHeader() {
    return (
      // Render logout/login button later on when user has or has not logged in
      <nav className="navbar sticky-top navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom shadow mb-3">
        <div className="container">
          <a href="/" className="navbar-brand pb-2">
            WonderBlog
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="navbar-collapse"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="/register" className="nav-link text-dark">
                  Register
                </a>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link text-dark">
                  Login
                </a>
              </li>
            </ul>
            <ul className="navbar-nav flex-grow-1">
              <li className="nav-item">
                <a href="/" className="nav-link text-dark">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="/myblog" className="nav-link text-dark">
                  My blog
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  render() {
    //A workaround for UI display (e.g: welcome user@gmail.com)
    //because Header component tends to not re-render after logging in (using history.push())
    const token = CookiesService.getAccessToken();
    //username and this.state.username will carry same value but they are different vars
    const username = this.props.cookies.get('email');
    if (!this.state.isLoggedIn) {
      //Since the component will not re-render, isLoggedIn will stay as false.
      //But the token is no longer null.
      //The workaround
      if (token !== undefined) {
        //Apply this for completely new user who just registered
        return this.renderLoggedInHeader(username);
      }
      else {
        return this.renderDefaultHeader();
      }
    }
    else {
      return this.renderLoggedInHeader(this.state.username);
    }
  }
}


export default withCookies(Header);
