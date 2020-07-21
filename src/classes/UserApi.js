import CrudApi from "./CrudApi";

class UserApi extends CrudApi {
  constructor() {
    super("users");
  }

  show() {
    return this._apiCore.get(`/myaccount`);
  }

  update(params) {
    return this._apiCore.put(`updateuser`, params);
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
