import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Message } from "semantic-ui-react";
import { users } from "../classes/UserApi";

export class SignUp extends Component {
  state = { username: "", email: "", password: "", error: "" };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async (e) => {
    const { username, email, password } = this.state;
    users
      .signup({ user: { username, email, password } })
      .then((res) => {
        if (res.status >= 400) {
          console.log(res);
          throw new Error(res.data);
        } else {
          alert("You have successfully signed up");
          this.props.history.push("/login");
          return <Redirect to="/login" />;
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      });
  };

  render() {
    const { error } = this.state;
    return (
      <div className="container">
        <h1>Sign Up</h1>
        {error && (
          <Message data-testid="signup-error">{this.state.error}</Message>
        )}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Username"
              name="username"
              placeholder="username"
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="Email"
              name="email"
              placeholder="email"
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="Password"
              name="password"
              placeholder="password"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    );
  }
}

export default SignUp;
