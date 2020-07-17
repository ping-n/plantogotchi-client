import { users } from "../../classes/UserApi";

class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(cb) {
    this.authenticated = true;
    cb();
  }

  logout(cb) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    this.hasToken();
    return this.authenticated;
  }

  async hasToken() {
    try {
      const response = await users.status();

      if (response.status >= 400) {
        throw new Error("not authorized");
      } else {
        console.log(response);
        const { jwt } = await response;
        localStorage.setItem("token", jwt);
        users.refreshApiInstance(jwt);
        this.authenticated = true;
      }
    } catch (err) {
      console.log(err.message);
    }
  }
}

export default new Auth();
