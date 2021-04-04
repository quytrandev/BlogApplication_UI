import APIService from './APIService'


class CommentService {
  GetCommentList(id) {
    const response = APIService.GETUrlWithId("/Comment/GetCommentList/", id)
      .catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
    return response;
  }

  async Add(postId, content, accessToken) {
    const response = await APIService.POSTUrlIdWithHeader(
      "/Comment/AddAComment/",
      postId,
      content,
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
      "/Comment/RemoveAComment/",
      id,
      accessToken).catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
    return response;
  }
}

export default new CommentService();