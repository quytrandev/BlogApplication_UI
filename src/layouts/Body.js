import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
//components
import PostAction from '../views/CRUD/PostAction';
import Home from "../views/Index/Home";
import MyBlog from "../views/Index/MyBlog";
import PostDetail from "../views/PostDetail/PostDetail";

export default class Body extends Component {
  render() {
    return (
      <div className="container">
        <div className="pb-4">
          <div
            className="jumbotron jumbotron-fluid mb-0 mt-0"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 100%), url('/img/home-bg.jpg')",
            }}
          >
            <div className="container text-center text-light">
              <h1 className="display-4">WonderBlog</h1>
              <p className="lead">
                Enlighten the community with your knowledge
              </p>
            </div>
          </div>
          <div className="card ">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <a href="/" className="nav-link ">
                    Home
                  </a>
                </li>
                <li className="nav-item ">
                  <a href="/myblog" className="nav-link ">
                    My blog
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="/postaction/add/"
                    className="nav-link btn btn-outline-primary"
                  >
                    Write your blog
                  </a>
                </li>
              </ul>
            </div>
            {/* Post goes here  */}
            <div className="card-body ">
              <Switch>
                <Route path="/myblog" component={MyBlog} />
                <Route path="/postdetail/:id" component={PostDetail} />
                <Route path="/postaction/:action/:id" component={PostAction} />
                <Route exact path="/postaction/:action/" component={PostAction} />
                <Route path="/" component={Home} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

