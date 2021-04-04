import APIService from './APIService'

class ProfileService {
  GetProfile(userId, accessToken) {
    const response = APIService.GETUrlIdWithHeader('/User/GetProfile/', userId, accessToken)
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
    return response;
  }
  Update(url, formData, accessToken) {
    const response = APIService.PUTUrlWithHeader(url, '', formData, accessToken)
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
    return response;
  }
}

export default new ProfileService();