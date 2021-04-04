import React, { Component } from 'react'
import history from '../../history';
//components
import PostDetailBody from '../../components/PostDetail/PostDetailBody';
import PostDropdownButton from '../../components/PostDetail/PostDropdownButton';
import CommentInput from '../../components/PostDetail/CommentInput';
//services
import CookiesService from '../../services/CookiesService';
import PostService from '../../services/PostService';

export default class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      post: {},
      comments: [],
      userId: CookiesService.getUserId(),
      isOwner: false,
    }
  }

  componentDidMount() {
    PostService.GetPostDetail(this.props.match.params.id)
      .then((response) => {
        if (response.data.isSuccess) {
          this.setState({ post: response.data.data });
        }
        else {
          history.push("/");
        }
        if (this.state.userId === this.state.post.userId) {
          this.setState({ isOwner: true });
        }
      })
  }

  render() {
    console.log('owner?: ', this.state.isOwner);
    return (
      <div className="card-body">
        {/* Blog */}
        <div className="col-md-12">
          <div className="pb-2">
            <div className="card shadow" style={{ backgroundSize: "cover" }}>
              <img
                className="card-img-top"
                src={this.state.post.pictureUrl}
                alt="Card cap"
              />

              <div className="">
                <div className="card-body ">
                  {/* Blog title */}
                  <div className="row">
                    <div className="col-md-11">
                      <h2
                        className="card-title"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {this.state.post.title}
                      </h2>
                    </div>
                    {/* Post owner function logic here */}
                    <div className="col-md-1">
                      <PostDropdownButton
                        postAction="edit"
                        postId={this.props.match.params.id}
                        isOwner={this.state.isOwner}
                      ></PostDropdownButton>
                    </div>
                  </div>
                  {/* User's info and blog content */}
                  <PostDetailBody post={this.state.post}></PostDetailBody>
                  {/* Comment section */}
                  <CommentInput
                    currentUserId={this.state.userId}
                    postId={this.props.match.params.id}
                  ></CommentInput>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
