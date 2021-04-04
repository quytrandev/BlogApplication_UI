import React, { Component } from "react";
import ToastifyMessage from "../../ToastifyMessage";
import history from "../../history";
//component
import CommentSection from "../PostDetail/CommentSection";
//service
import CommentService from "../../services/CommentService";
import CookiesService from "../../services/CookiesService";

export default class CommentInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      comments: [],
      willRefresh: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //event handlers
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const accessToken = CookiesService.getAccessToken();

    const postId = this.props.postId;
    if (accessToken === undefined) {
      history.push("/login");
    }
    else {
      if (this.state.content.length === 0) {
        ToastifyMessage.Error("Please input your comment", "yes");
      }
      else {
        CommentService.Add(
          postId,
          JSON.stringify(this.state.content),
          accessToken
        ).then((response) => {
          if (response.data.isSuccess) {
            ToastifyMessage.Success("Comment has been added");
            //clear comment input box
            this.setState({ content: "" });
            this.refreshCommentSection(postId);
            
          }
        });
      }
    }
  }

  //methods
  refreshAfterRemoving = (status) => {
    //double callback to detect comment removal
    //willReloadParent in CommentSection.js will call this method
    this.setState({ willRefresh: status })
    if (this.state.willRefresh) {
      this.refreshCommentSection(this.props.postId);
    }
  }

  refreshCommentSection(postId) {
    CommentService.GetCommentList(postId).then((response) => {
      console.log(response);
      this.setState({ comments: response.data.data });
    });
  }

  componentDidMount() {
    CommentService.GetCommentList(this.props.postId).then((response) => {
      console.log(response);
      this.setState({ comments: response.data.data });
    });
  }
  render() {
    console.log('refreshing: ', this.state.willRefresh);
    return (
      <div>
        {/* Comment input */}
        <form id="commentForm" onSubmit={this.handleSubmit}>
          <div className="input-group">
            <textarea
              id="commentInput"
              value={this.state.content}
              name="content"
              onChange={this.handleChange}
              placeholder="Write your comment..."
              className="form-control"
              style={{ height: "120px" }}
              maxLength="1000"
            ></textarea>
            <button
              type="submit"
              className="btn btn-outline-primary fas fa-paper-plane"
            ></button>
          </div>
          <span className="text-danger" id="contentError"></span>
        </form>
        <CommentSection willRefresh={this.refreshAfterRemoving} currentUserId={this.props.currentUserId} comments={this.state.comments}></CommentSection>
      </div>
    );
  }
}
