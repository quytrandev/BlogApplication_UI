import React, { Component } from 'react'
import moment from 'moment'

export default class Post extends Component {
  render() {
    return (
      <div>
        <div key={this.props.post.postId} id={this.props.post.postId} className="pb-3 mr-2" >
          <div className="col-md-12">
            <div className="card shadow">
              <div className="row px-3" style={{ minHeight: "320px" }}>
                <div className="col-md-5 pt-3 mt-2">
                  <a href={`/postdetail/${this.props.post.postId}`}>
                    <img className="card-img" src={this.props.post.pictureUrl} style={{ maxHeight: "270px" }} alt="" />
                  </a>
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    {/* Post title */}
                    <a href={`/postdetail/${this.props.post.postId}`} style={{ color: "black" }}>
                      <h4
                        className="card-title pb-1"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {this.props.post.title}
                      </h4>
                    </a>
                    <p
                      className="card-text"
                      style={{
                        height: "170px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {this.props.post.content}
                    </p>
                    <p className="text-right card-text ">
                      <small className="text-muted">
                        - by <a href="/#">{this.props.post.username}</a> on {moment(this.props.post.createdAt).format("Do MMMM, YYYY hh:mm A")}
                      </small>
                      <br />
                      <a href={`/postdetail/${this.props.post.postId}`}>
                        <i className="fas fa-comment"></i> {this.props.post.totalComment} Comments
                        </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
