import React from "react";
import axios from "axios";

class Login extends React.Component {
  async getData() {
    const response = await axios.get(`${process.env.REACT_BACKEND_URL}`);
    const data = response.data
  }

  render() {
    return <div>Login</div>;
  }
}

export default Login;
