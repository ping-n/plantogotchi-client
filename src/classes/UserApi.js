import CrudApi from "./CrudApi";

class UserApi extends CrudApi {
  constructor() {
    super("users");
  }

  signup(newUser) {
    return this._apiCore.post(`/sign-up`, newUser);
  }

  login(userCredentials) {
    return this._apiCore.post(`/login`, userCredentials);
  }

  status() {
    return this._apiCore.get(`/status`);
  }
}

export let users = new UserApi();
