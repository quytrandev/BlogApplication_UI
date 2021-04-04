import APIService from './APIService'


class PostService {
  GetPostList() {
    const response = APIService.GETUrl("/Post/Index")
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
    return response;
  }
  
  GetMyBlog(id) {
    const response = APIService.GETUrlWithId("/Post/MyBlog/", id)
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
    return response;
  }

  GetPostDetail(id) {
    const response = APIService.GETUrlWithId("/Post/PostDetail/", id)
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
    return response;
  }

  async Add(formData, accessToken) {
    const response = await APIService.POSTUrlWithHeader(
      "/Post/AddAPost",
      formData,
      accessToken
    ).catch(function (error) {
      if (error.response) {
        return error.response;
      }
    });
    return response;
  }

  async Edit(formData, id, accessToken) {
    const response = await APIService.PUTUrlWithHeader(
      "/Post/EditAPost/",
      id,
      formData,
      accessToken
    ).catch(function (error) {
      if (error.response) {
        return error.response;
      }
    });
    return response;
  }
  Remove(id, accessToken) {
    const response = APIService.DELETEUrlWithHeader(
      "/Post/RemoveAPost/",
      id,
      accessToken).catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
    return response;
  }
}

export default new PostService();