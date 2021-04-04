import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import ToastifyMessage from '../../ToastifyMessage';
//service
import CommentService from '../../services/CommentService';
import CookiesService from '../../services/CookiesService';

export default class CommentRemoveConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      isCommentOwner: false,
      accessToken: CookiesService.getAccessToken(),
    }
  }
  //event handlers
  handleClose = () => {
    this.setState({ isShown: false });
  }

  handleShow = () => {
    this.setState({ isShown: true });
  }

  handleRemove = () => {
    this.setState({ isShown: false });

    if (this.state.isCommentOwner) {
      CommentService.Remove(this.props.commentId, this.state.accessToken).then((response) => {
        if (response.data.isSuccess) {
          console.log("comment removed", this.props.commentId);
          ToastifyMessage.Success("Successfully removed the comment");
          //callback
          this.props.reloadParent(true);
          //history.push("/");
        }
        else {
          ToastifyMessage.Success("Failed to remove the comment");
          console.log('failed to remove the comment');
        }
      })
    }
  }

  componentDidMount() {
    const currentUserId = this.props.currentUserId;
    const commentOwnerId = this.props.commentOwnerId;

    if (currentUserId === commentOwnerId) {
      this.setState({ isCommentOwner: true });
    }
  }
  
  render() {
    if (this.state.isCommentOwner) {
      return (
        <div className="col-md-1 text-right ">
          <a
            onClick={this.handleShow}
            style={{
              textDecoration: "none",
              color: "red",
            }}
          >
            <i className="fas fa-trash"> </i>
          </a>

          <Modal show={this.state.isShown} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure want to remove this comment?
                  </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Cancel
                    </Button>
              <Button variant="danger" onClick={this.handleRemove}>
                Remove
                    </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
    else {
      return (<div></div>);
    }

  }
}
