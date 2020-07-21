import CrudApi from "./CrudApi";

class BreedApi extends CrudApi {
  constructor() {
    super("breeds");
  }

  create(newExample) {
    this._apiCore.interceptors.request.use((config) => {
      config.headers["Content-Type"] = "multipart/form-data";
      return config;
    });
    return this._apiCore.post(`${this._url}`, newExample);
  }
}

export let breeds = new BreedApi();
