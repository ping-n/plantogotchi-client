import CrudApi from "./CrudApi";

class UserApi extends CrudApi {
    constructor() {
        super('users')
    }

    signup(newUser) {
        return this._apiCore.post(`${this._basePath}/sign-up`, newUser);
    }

    login(userCredentials) {
        return this._apiCore.post(`${this._basePath}/login`, userCredentials);
    }
}

export let users = new UserApi();