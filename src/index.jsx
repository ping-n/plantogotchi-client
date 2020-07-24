import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import "./fonts/DigitalDisco.ttf";
import "./stylesheets/index.css";
import "semantic-ui-less/semantic.less";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
