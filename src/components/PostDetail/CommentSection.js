import React, { Component } from "react";
import moment from "moment";
//component
import CommentRemoveConfirmation from "./CommentRemoveConfirmation";

export default class CommentSection extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      isReloaded: false,
    }
  }

  willReloadParent = (status) => {
    //call to handleRemove in CommentRemoveConfirmation.js
    this.setState({ isReloaded: status });
    if (this.state.isReloaded) {
      this.props.willRefresh(this.state.isReloaded);
    }
  }

  renderComment() {
    return (
      <div id="commentSection" className="">
        <div className="card my-4">
          <div className="card-header">
            <strong>Comments</strong>
          </div>
          <ul className="list-group list-group-flush">
            {this.props.comments.map((comment) => (
              <li key={comment.commentId} className="list-group-item">
                <div className="row">
                  <div className="row col-md-12">
                    <div className="col-md-11">
                      <a href="/#">
                        <h4>{comment.username}</h4>
                        <small className="text-muted">
                          commented on{" "}
                          {moment(comment.createdAt).format(
                            "Do MMMM, YYYY hh:mm A"
                          )}
                        </small>
                        <br />
                      </a>
                    </div>
                    {/* Delete comment*/}
                    <CommentRemoveConfirmation reloadParent={this.willReloadParent} commentId={comment.commentId} currentUserId={this.props.currentUserId}
                      commentOwnerId={comment.commentOwnerId} />
                  </div>
                  <div>
                    <p
                      className="text-dark text-justify px-3"
                      style={{
                        minHeight: "75px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {comment.content}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>);
  }

  render() {
    console.log('will reload this comment section? ', this.state.isReloaded);
    if (this.props.comments === null) {
      return (
        <div id="commentSection" className="">
          <div className="card my-4">
            <div className="card-header">
              <strong>Comments</strong>
            </div>
          </div>
        </div>
      );
    }
    else {
      return this.renderComment();
    }
  }
}
