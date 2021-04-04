import React, { Component } from 'react'
import moment from 'moment'

export default class PostDetailBody extends Component {
    render() {
        return (
          <div>
            <div className="pb-3">
              <small className="text-muted">
                posted by
                <a href="/#"> {this.props.post.username} </a>
                on{" "}
                {moment(this.props.post.createdAt).format(
                  "Do MMMM, YYYY hh:mm A"
                )}
              </small>
            </div>
            <p className="card-text text-justify" style={{ minHeight: "70px" }}>
              {this.props.post.content}
            </p>
            <p className="text-right card-text pb-3">
              <br />
              <a href="#commentSection" className="text-dark">
                <i className="fas fa-comment"></i> {this.props.post.totalComment} Comments
              </a>
            </p>
          </div>
        );
    }
}
