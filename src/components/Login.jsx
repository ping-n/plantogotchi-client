import React, { Component } from "react";
import { Button, Form, Input } from "formik-semantic-ui";
import { users } from "../classes/UserApi";
import Auth from "./auth/Auth";

class Login extends Component {
  _handleSubmit = (values) => {
    users
      .login(JSON.stringify({ auth: values }))
      .then((res) => {
        console.log(res);
        const { jwt } = res;
        localStorage.setItem("token", jwt);
        Auth.login(()=>{this.props.history.push("/test");})
      })
      .catch((error) => console.log(`error:${error}`));
  };

  render() {
    return (
      <div class="container">
        <Form onSubmit={this._handleSubmit}>
          <Form.Group widths="2">
            <Input label="email" name="email" />
            <Input label="password" name="password" />
          </Form.Group>

          <Button.Submit>Submit</Button.Submit>
          <Button.Reset>Cancel</Button.Reset>
        </Form>
      </div>
    );
  }
}

export default Login;
