import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import history from '../../history';
import ToastifyMessage from '../../ToastifyMessage'
//service
import CookiesService from '../../services/CookiesService';
import PostService from '../../services/PostService';

export default class PostDropdownButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false,
      accessToken: "",
    };
  }

  handleClose = () => {
    this.setState({ isShown: false });
  }

  handleShow = () => {
    this.setState({ isShown: true });
  }

  handleRemove = () => {
    this.setState({ isShown: false });
    if (this.props.isOwner) {
      PostService.Remove(this.props.postId, this.state.accessToken).then((response) => {
        if (response.data.isSuccess) {
          ToastifyMessage.Success('Post has been removed successfully');
          history.push("/");
        }
        else {
          ToastifyMessage.Success('Failed to remove the current post');
          console.log('failed to remove the post');
        }
      })
    }
  }

  componentDidMount() {
    const accessToken = CookiesService.getAccessToken();
    this.setState({ accessToken: accessToken });
  }

  render() {
    console.log('modal state: ', this.state.isShown);
    if (this.props.isOwner) {
      return (
        <div className="">
          <a
            href={`/postaction/${this.props.postAction}/${this.props.postId}`}
            className="pr-3"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <i className="fas fa-edit"></i>
          </a>
          <a
            variant="primary"
            onClick={this.handleShow}
            style={{
              textDecoration: "none",
              color: "red",
            }}
          >
            <i className="fas fa-trash"></i>
          </a>
          <Modal show={this.state.isShown} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure want to remove this blog?
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
    } else {
      return <div></div>;
    }
  }
}

