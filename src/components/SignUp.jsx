import React, { Component } from "react";
import { Button, Form, Input } from "formik-semantic-ui";
import { Redirect } from "react-router-dom"
import { Message } from "semantic-ui-react";
import { users } from "../classes/UserApi";

export class SignUp extends Component {
  state = { error: "" };

  _handleSubmit = (values, { setSubmitting }) => {
    users
      .signup(JSON.stringify({ user: values }))
      .then((res) => {
        if (res.status >= 400) {
          throw new Error("incorrect credentials");
        } else {
          const { jwt } = res.data;
          localStorage.setItem("token", jwt);
          alert("You have successfully signed up")
          this.props.history.push("/")
          return <Redirect  to="/login" />
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
        <h1>Sign Up</h1>
        {error && (
          <Message data-testid="signup-error">{this.state.error}</Message>
        )}
        <Form onSubmit={this._handleSubmit}>
          <Form.Group widths="2">
            <Input label="username" name="username" />
            <Input label="email" name="email" />
            <Input label="password" name="password" />
          </Form.Group>

          <Button.Submit>Submit</Button.Submit>
        </Form>
      </div>
    );
  }
}

export default SignUp;
