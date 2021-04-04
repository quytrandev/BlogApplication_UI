import React, { Component } from 'react'
import PaginationList from 'react-pagination-list'
import './../../index.css'
//component
import Post from '../../components/Index/Post'
//service
import PostService from '../../services/PostService';

export default class Home extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    PostService.GetPostList().then((response) => {
      if (response.data.data !== undefined) {
        this.setState({ posts: response.data.data });
      }
    })
  }

  render() {
    if (this.state.posts != null) {
      return (
        <div>
          <h4>
            <i className="fas fa-home"></i> Home
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
    else return (<div className="col-md-12 text-center">
      <div className="">
        <h1>
          Oops!
        </h1>
        <div>
          Looks like there is no post here...
        </div>
        <div className="pt-3">
          <a href="/postaction/add" className="btn btn-outline-primary">Write a very first blog ever!</a>
        </div>
      </div>
    </div>);
  }
}

