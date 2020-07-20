import React, { Component } from "react";
import { Button, Form, Input } from "formik-semantic-ui";
import { Message } from "semantic-ui-react";
import { users } from "../classes/UserApi";
import Auth from "./auth/Auth";

class Login extends Component {
  state = { error: "" };

  _handleSubmit = (values, { setSubmitting }) => {
    users
      .login(JSON.stringify({ auth: values }))
      .then((res) => {
        if (res.status >= 400) {
          throw new Error("incorrect credentials");
        } else {
          const { jwt } = res.data;
          localStorage.setItem("token", jwt);
          Auth.login(() => {
            this.props.history.push("/plants");
          });
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      });
    setSubmitting(false);
  };

  render() {
    const { error } = this.state;
    return (
      <div class="container">
        <h1>Login</h1>
        {error && <Message data-testid="login-error">{this.state.error}</Message>}
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
