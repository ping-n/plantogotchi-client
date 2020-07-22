import axios from "axios";

const defaultOptions = {
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosInstance = axios.create(defaultOptions);

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default class CrudApi {
  constructor(url) {
    this._apiCore = axiosInstance;
    this._url = url;
  }

  index() {
    return this._apiCore.get(`${this._url}`);
  }

  show(id) {
    return this._apiCore.get(`${this._url}/${id}`);
  }

  create(newExample) {
    return this._apiCore.post(`${this._url}`, newExample);
  }

  update(id, nextExample) {
    return this._apiCore.put(`${this._url}/${id}`, nextExample);
  }

  delete(id) {
    return this._apiCore.delete(`${this._url}/$id`);
  }
}
