import React, { Component } from 'react'
import ToastifyMessage from '../../ToastifyMessage';
//service
import CookiesService from '../../services/CookiesService';
import ProfileService from '../../services/ProfileService';

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state =
    {
      username: "",
      subName: "", //store the latest updated name to prevent re-using that name right after updating
    }
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
    const userId = CookiesService.getUserId();
    const accessToken = CookiesService.getAccessToken();
    const username = this.state.username.trim();
    event.preventDefault();
    this.validateData(userId, username, accessToken);
  }

  //methods
  updateUsername(userId, username, accessToken) {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("username", username);

    ProfileService.Update('/User/UpdateUsername', formData, accessToken).then((response) => {
      if (response.data.isSuccess) {
        this.setState({ subName: username });
        ToastifyMessage.Success(response.data.message);
      }
      else {
        ToastifyMessage.Error(response.data.message, 'yes');
      }
    });
  }

  validateData(userId, username, accessToken) {
    if (userId !== null && username.length !== 0 && accessToken !== null) {
      if (username === this.props.profile.username) {
        ToastifyMessage.Error('Please insert a new username', 'yes');
      }
      else if (username === this.state.subName) {
        //prevent re-using updated name at current moment
        ToastifyMessage.Error('Please insert a new username', 'yes');
      }
      else {
        //approved to update
        this.updateUsername(userId, username, accessToken);
      }
    }
    else {
      ToastifyMessage.Error('Please insert a display name', 'yes');
    }
  }
  
  render() {
    if (this.props.profile !== undefined && this.props.profile !== "") {
      return (
        <div>
          <div className="row">
            <div className="col-md-12">
              <h4>Your Profile</h4>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group row">
                  <label className="col-4 col-form-label">
                    Email
                      </label>
                  <div className="col-8">
                    <input
                      id="email"
                      name="email"
                      value={this.props.profile.email}
                      placeholder=""
                      className="form-control here"
                      required="required"
                      type="text"
                      disabled
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-4 col-form-label">
                    Display Name
                      </label>
                  <div className="col-8">
                    <input
                      id="username"
                      name="username"
                      value={this.state.username}
                      onChange={this.handleChange}
                      placeholder={this.props.profile.username}
                      className="form-control here"
                      type="text"
                    />
                  </div>
                </div>

                <div className="form-group text-right">
                  <button type="submit" className="btn btn-primary">
                    Update
                      </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
    else
      return (<div></div>);
  }
}
