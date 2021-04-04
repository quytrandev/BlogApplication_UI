import React, { Component } from 'react'
import history from '../../history';
import PaginationList from 'react-pagination-list'
//component
import Post from './../../components/Index/Post';
//services
import PostService from '../../services/PostService';
import CookiesService from '../../services/CookiesService';

export default class MyBlog extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    const userId = CookiesService.getUserId();
    if (userId === undefined) {
      history.push("/login");
    }
    else {
      PostService.GetMyBlog(userId).then((response) => {
        this.setState({ posts: response.data.data });
      })
    }
  }

  render() {
    if (this.state.posts != null) {
      return (
        <div>
          <h4>
            <i className="fas fa-user"></i> My blog
            </h4>
          <div className="ml-1">
            <PaginationList
              data={this.state.posts}
              pageSize={5}
              renderItem={(item, key) => <Post key={key} post={item}></Post>}
            ></PaginationList>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="col-md-12 text-center">
          <div className="">
            <h1>
              Oops!
            </h1>
            <div>
              Looks like you have not posted anything yet...
            </div>
            <div className="pt-3">
              <a href="/postaction/add" className="btn btn-outline-primary">Write your blog now</a>
              <br />
              <br />
              <a href="/" className="btn btn-outline-secondary">Back to Home </a>
            </div>
          </div>
        </div>)
    }
  }
}

