import { users } from "../../classes/UserApi";

class Auth {
  constructor() {
    this.authenticated = false;
    this.admin = false;
  }

  login(cb) {
    this.authenticated = true;
    cb();
  }

  logout(cb) {
    this.authenticated = false;
    this.admin = false;
    cb();
  }

  async isAuthenticated() {
    await this.hasToken();
    return this.authenticated;
  }

  async isAdmin() {
    await this.hasToken();
    return this.admin;
  }

  async hasToken() {
    await users
      .status()
      .then((response) => {
        if (response.status === 401) {
          throw new Error("Not Authorized");
        } else if (response.status >= 400) {
          throw new Error("Server Error");
        } else {
          const { jwt, admin } = response.data;
          localStorage.setItem("token", jwt);
          this.authenticated = true;
          if (admin === true) {
            this.admin = true;
          }
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}

export default new Auth();
