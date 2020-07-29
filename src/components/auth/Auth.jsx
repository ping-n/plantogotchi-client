import { users } from "../../classes/UserApi";

class Auth {
  constructor() {
    this.authenticated = false;
    this.admin = false;
  }

  // Log user in
  login(cb) {
    this.authenticated = true;
    cb();
  }

  // Log user out
  logout(cb) {
    this.authenticated = false;
    this.admin = false;
    cb();
  }

  // Check if user is Authenticated
  async isAuthenticated() {
    await this.hasToken();
    return [this.authenticated, this.admin];
  }

  // Check if user is an Admin
  async isAdmin() {
    await this.hasToken();
    return this.admin;
  }

  // Check if token exist in local storage
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
          if (admin) {
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
