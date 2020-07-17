import ApiCore from "axios-core-api";
const jwt = localStorage.getItem("token");
const apiConfig = {
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${jwt}`,
    "Content-Type": "application/json",
  },
  timeout: 15000,
};

export default class CrudApi {
  constructor(url) {
    this._apiCore = new ApiCore(apiConfig);
    this._basePath = "https://pure-oasis-63936.herokuapp.com";
    this._url = url;
  }

  index() {
    return this._apiCore.get(`${this._basePath}/${this._url}`);
  }

  show(id) {
    return this._apiCore.get(`${this._basePath}/${this._url}/${id}`);
  }

  create(newExample) {
    return this._apiCore.post(`${this._basePath}/${this._url}`, newExample);
  }

  update(id, nextExample) {
    return this._apiCore.put(
      `${this._basePath}/${this._url}/${id}`,
      nextExample
    );
  }

  delete(id) {
    return this._apiCore.delete(`${this._basePath}/${this._url}/$id`);
  }

  refreshApiInstance(newAccessToken) {
    const newConfig = apiConfig;

    newConfig.headers.Authorization = `Bearer ${newAccessToken}`;

    this._apiCore.refreshApiInstance(newConfig);
  }
}
