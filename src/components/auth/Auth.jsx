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
    console.log(`authenticated: ${this.authenticated}`);
    return this.authenticated;
  }

  async hasToken() {
    await users
      .status()
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Not Authorized");
        } else {
          const { jwt } = response.data;
          localStorage.setItem("token", jwt);
          this.authenticated = true;
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}

export default new Auth();
