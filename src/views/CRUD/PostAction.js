import React, { Component } from "react";
import history from "../../history";
import ToastifyMessage from "../../ToastifyMessage";
//services
import CookiesService from "../../services/CookiesService";
import PostService from "../../services/PostService";

export default class PostAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      title: "",
      content: "",
      pictureUrl: "",
      file: [],
      postOwnerId: "",
      currentUserId: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveFile = this.saveFile.bind(this);
  }

  //event handlers
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  }

  saveFile(event) {
    console.log(event.target.files[0]);
    this.setState({ file: event.target.files[0] });
    this.setState({ pictureUrl: event.target.files[0].name });
  }

  async handleSubmit(event) {
    const accessToken = CookiesService.getAccessToken();
    const action = this.props.match.params.action;
    const id = this.props.match.params.id;

    if (accessToken == null) {
      history.push("/login");
    } else {
      if (action === "add") {
        event.preventDefault();
        await this.postAction(accessToken, action);
      } else if (action === "edit" && id !== undefined) {
        event.preventDefault();
        //prevent access from URL
        if (this.state.currentUserId === this.state.postOwnerId) {
          await this.postAction(accessToken, action, id);
        } else {
          ToastifyMessage.Error('Failed to perform the action');
          history.push("/");
        }
      }
    }
  }

  //methods
  async validateData(
    action,
    title,
    content,
    formFile,
    formData,
    accessToken,
    id
  ) {
    let response;
    if (title.length === 0 || content.length === 0) {
      ToastifyMessage.Error("Fields cannot be empty", "yes");
    } else {
      if (action === "add") {
        console.log("file exists?:", formFile.length);
        if (formFile.length !== 0) {
          response = await PostService.Add(formData, accessToken);
          return response;
        }
        ToastifyMessage.Error("Image is required", "yes");
      } else if (action === "edit") {
        response = await PostService.Edit(formData, id, accessToken);
        return response;
      }
    }
  }

  getCurrentPost(id) {
    PostService.GetPostDetail(id).then((response) => {
      this.setState({ title: response.data.data.title });
      this.setState({ content: response.data.data.content });
      this.setState({ pictureUrl: response.data.data.pictureUrl });
      this.setState({ postOwnerId: response.data.data.userId });
    });
  }

  async postAction(accessToken, action, id) {
    if (accessToken !== null) {
      const title = this.state.title;
      const content = this.state.content;
      const pictureUrl = this.state.pictureUrl;
      const formFile = this.state.file;
      //
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("pictureUrl", pictureUrl);
      formData.append("formFile", formFile);
      //
      if (action === "add") {
        this.validateData(
          action,
          title,
          content,
          formFile,
          formData,
          accessToken
        ).then((response) => {
          this.redirectOnSuccess(response);
        });
      } else if (action === "edit") {
        this.validateData(
          action,
          title,
          content,
          formFile,
          formData,
          accessToken,
          id
        ).then((response) => {
          this.redirectOnSuccess(response);
        });
      }
    } else {
      ToastifyMessage.Error("Failed to perform the action", "yes");
    }
  }

  redirectOnSuccess(response) {
    try {
      if (response.status === 200) {
        if (response.data.isSuccess) {
          ToastifyMessage.Success("Action performed successfully");
          history.push("/postdetail/" + response.data.currentItemId);
        } else {
          ToastifyMessage.Error("Failed to perform the action", "yes");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  renderAddAction() {
    return (
      <div className='row px-3 my-4'>
        <div className='col-md-1'></div>
        <div className='col-md-10 card-body shadow'>
          <div>
            <h3 className='card-title text-center'>Write your blog</h3>

            <form
              name='blogForm'
              id='blogData'
              encType='multipart/form-data'
              onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <label>Title</label>
                <input
                  value={this.state.title}
                  onChange={this.handleChange}
                  name='title'
                  type='text'
                  className='form-control'
                  placeholder='Enter your title...'
                />
                <span id='titleError' className='text-danger'></span>
              </div>
              <div className='form-group'>
                <label>Content</label>
                <div className='input-group'>
                  <textarea
                    name='content'
                    value={this.state.content}
                    onChange={this.handleChange}
                    className='form-control'
                    style={{ minHeight: "300px" }}
                    aria-label='With textarea'></textarea>
                </div>
                <span id='contentError' className='text-danger'></span>
              </div>
              <div className='form-group'>
                <label>Image</label>

                <div className='input-group mb-3'>
                  <br />
                  <div className='form-group'>
                    <div className=''>
                      <input
                        id='uploadFile'
                        type='file'
                        name='file'
                        onChange={this.saveFile}
                      />
                    </div>
                    <span id='fileError' className='text-danger'></span>
                  </div>
                </div>
              </div>
              <div className='form-group text-right'>
                <button type='submit' className='btn btn-primary'>
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className='col-md-1'></div>
      </div>
    );
  }

  renderEditAction() {
    return (
      <div className='row px-3 my-4'>
        <div className='col-md-1'></div>
        <div className='col-md-10 card-body shadow'>
          <div>
            <h3 className='card-title text-center'>Edit your blog</h3>

            <form
              name='blogForm'
              id='blogData'
              encType='multipart/form-data'
              onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <label>Title</label>
                <input
                  value={this.state.title}
                  onChange={this.handleChange}
                  name='title'
                  type='text'
                  className='form-control'
                  placeholder='Enter your title...'
                />
                <span id='titleError' className='text-danger'></span>
              </div>
              <div className='form-group'>
                <label>Content</label>
                <div className='input-group'>
                  <textarea
                    name='content'
                    value={this.state.content}
                    onChange={this.handleChange}
                    className='form-control'
                    style={{ minHeight: "300px" }}
                    aria-label='With textarea'></textarea>
                </div>
                <span id='contentError' className='text-danger'></span>
              </div>
              <div className='form-group'>
                <label>Image</label>

                <div className='input-group mb-3'>
                  <br />
                  <div className='form-group'>
                    <div className=''>
                      <input
                        id='uploadFile'
                        type='file'
                        name='file'
                        onChange={this.saveFile}
                      />
                    </div>
                    <span id='fileError' className='text-danger'></span>
                  </div>
                </div>
              </div>
              <div className='form-group text-right'>
                <button type='submit' className='btn btn-primary'>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className='col-md-1'></div>
      </div>
    );
  }

  componentDidMount() {
    const accessToken = CookiesService.getAccessToken();
    const currentUserId = CookiesService.getUserId();
    const id = this.props.match.params.id;
    console.log(accessToken);
    if (accessToken == null) {
      history.push("/login");
    } else {
      if (this.props.match.params.action === "edit" && id !== undefined) {
        this.getCurrentPost(id);

        this.setState({ currentUserId: currentUserId });
      }
    }
  }

  render() {
    
    if (this.props.match.params.action === "add") {
      return this.renderAddAction();
    }
    return this.renderEditAction();
  }
}
