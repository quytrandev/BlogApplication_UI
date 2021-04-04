import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
//components
import ChangePassword from '../../components/Profile/ChangePassword'
import UserProfile from '../../components/Profile/UserProfile'
//services
import ProfileService from '../../services/ProfileService';
import CookiesService from '../../services/CookiesService';

export default class Profile extends Component {
  state =
    {
      profile: "",
    }

  componentDidMount() {
    const userId = CookiesService.getUserId();
    const accessToken = CookiesService.getAccessToken();

    if (userId !== undefined && accessToken !== undefined) {
      ProfileService.GetProfile(userId, accessToken)
        .then((response) => {
          if (response.data.data !== undefined) {
            console.log('lets get profile');
            this.setState({ profile: response.data.data });
          }
        })
    }
  }

  render() {
    console.log(this.state.profile);
    if (this.state.profile !== "") {
      return (
        <div className="container pt-4" style={{ minHeight: "500px" }}>
          <div className="row">
            <div className="col-md-3 ">
              <div className="list-group ">
                <a href="/profile" className="list-group-item list-group-item-action">
                  Profile
                  </a>
                <a href="/profile/changepassword" className="list-group-item list-group-item-action">
                  Change password
                  </a>
              </div>
            </div>
            <div className="col-md-9">
              <div className="card">
                <div className="card-body">
                  <Switch>
                    <Route exact path="/profile" render={() => <UserProfile profile={this.state.profile} />} />
                    <Route path="/profile/changepassword" component={ChangePassword} />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="col-md-12 text-center card-body" style={{ minHeight: "500px" }}>
          <div className="">
            <h1>Woops!</h1>

            <div>Nothing to see here...</div>

            <div className="pt-3">
              <a href="/login" className="btn btn-outline-primary">
                Login
                </a>
              <br />
              <br />
              <a href="/" className="btn btn-outline-secondary">
                Back to Home{" "}
              </a>
            </div>
          </div>
        </div>
      );
    }
  }
}



