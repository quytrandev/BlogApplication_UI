import React, { Component } from 'react'
import ToastifyMessage from '../../ToastifyMessage';
import history from './../../history';
//service
import CookiesService from '../../services/CookiesService'
import ProfileService from '../../services/ProfileService'

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };
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
    const currentPassword = this.state.currentPassword;
    const newPassword = this.state.newPassword;
    const confirmNewPassword = this.state.confirmNewPassword;
    //
    event.preventDefault();
    this.validateData(currentPassword, newPassword, confirmNewPassword, userId, accessToken);
  }

  //methods
  changePassword(userId, currentPassword, newPassword, accessToken) {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("password", currentPassword);
    formData.append("newPassword", newPassword);

    ProfileService.Update("/User/ChangePassword",
      formData,
      accessToken
    ).then((response) => {
      if (response.data.isSuccess) {
        ToastifyMessage.Success(response.data.message);
        CookiesService.removeCookiesOnLoggingOut();
        setTimeout(() => {
          history.push('/login');
        }, 1500);

      } else {
        ToastifyMessage.Error(response.data.message, "yes");
      }
    });
  }

  validateData(currentPassword, newPassword, confirmNewPassword, userId, accessToken) {
    if (currentPassword.length === 0 || newPassword.length === 0 || confirmNewPassword.length === 0) {
      ToastifyMessage.Error('Fields cannot be empty', 'yes');
    }
    else {
      if (currentPassword === newPassword) {
        ToastifyMessage.Error('Current and new password must be different', 'yes');
      }
      else if (newPassword !== confirmNewPassword) {
        ToastifyMessage.Error('Passwords do not match', 'yes');
      }
      else {
        if (accessToken !== undefined & userId !== undefined) {
          //Approved to change password
          this.changePassword(userId, currentPassword, newPassword, accessToken)
        }
        else {
          ToastifyMessage.Error('Please re-login');
          history.push('/login');
        }
      }
    }
  }
  
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h4>Change password</h4>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row">
                <label className="col-4 col-form-label">
                  Current Password
                </label>
                <div className="col-8">
                  <input
                    value={this.state.currentPassword}
                    onChange={this.handleChange}
                    name="currentPassword"
                    placeholder="Current password"
                    className="form-control here"
                    type="password"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-4 col-form-label">
                  New Password
                </label>
                <div className="col-8">
                  <input
                    value={this.state.newPassword}
                    onChange={this.handleChange}
                    name="newPassword"
                    placeholder="New password"
                    className="form-control here"
                    type="password"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-4 col-form-label">
                  Confirm Password
                </label>
                <div className="col-8">
                  <input
                    value={this.state.confirmNewPassword}
                    onChange={this.handleChange}
                    name="confirmNewPassword"
                    placeholder="Confirm new password"
                    className="form-control here"
                    type="password"
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
}

