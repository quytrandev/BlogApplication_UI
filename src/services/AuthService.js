import API from './API'

class AuthService {
  async Login(email, password) {
    const response = await API.post("/User/Login", {
      email,
      password,
    }).catch(function (error) {
      if (error.response) {
        return error.response;
      }
    });
    return response;
  }

  async Register(email, password, username) {
    const response = await API.post("/User/Register", {
      email,
      password,
      username
    }).catch(function (error) {
      if (error.response) {
        return error.response;
      }
    });
    return response;
  }
}

export default new AuthService();

