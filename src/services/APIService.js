import API from "./API";

class APIService {
  GETUrl(url) {
    const response = API.get(url);
    return response;
  }

  GETUrlWithId(url, id) {
    const response = API.get(url + id);
    return response;
  }

  PUTUrlWithHeader(url, id, data, accessToken) {
    const response = API.put(url + id, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  }

  DELETEUrlWithHeader(url, id, accessToken) {
    const response = API.delete(url + id, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  }

  GETUrlWithHeader(url, accessToken) {
    const response = API.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  }

  GETUrlIdWithHeader(url, id, accessToken) {
    const response = API.get(url + id, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  }

  POSTUrlWithHeader(url, data, accessToken) {
    const response = API.post(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  }

  POSTUrlIdWithHeader(url, id, data, accessToken) {
    const response = API.post(url + id, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  }
}

export default new APIService();
