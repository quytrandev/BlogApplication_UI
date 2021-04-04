import { Cookies } from "react-cookie";

class CookiesService {
  constructor() {
    this.cookies = new Cookies();
  }

  getAccessToken() {
    const accessToken = this.cookies.get("token");

    return accessToken;
  }

  getUserId() {
    const userId = this.cookies.get("userId");
    return userId;
  }

  setCookieWithDuration(cookieName, value, duration) {
    this.cookies.set(cookieName, value, { path: '/', maxAge: duration });
  }

  removeCookiesOnLoggingOut() {
    console.log('cookies removed');
    this.cookies.remove('userId', { path: '/' });
    this.cookies.remove('token', { path: '/' });
    this.cookies.remove('email', { path: '/' });
    this.cookies.remove('newComer', { path: '/' });
  }
}
export default new CookiesService();