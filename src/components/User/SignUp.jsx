import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Message, Header } from "semantic-ui-react";
import { users } from "../../classes/UserApi";

export class SignUp extends Component {
  state = { error: "" };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async (e) => {
    const { username, email, password, bio, location } = this.state;
    users
      .signup({ user: { username, email, password, bio, location } })
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
        <Header as="h1" black >Sign Up</Header>
        {error && (
          <Message data-testid="signup-error">{this.state.error}</Message>
        )}
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            fluid
            label="Username"
            name="username"
            data-testid="username"
            placeholder="username"
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            label="Email"
            name="email"
            data-testid="email"
            placeholder="email"
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            label="Password"
            name="password"
            data-testid="password"
            placeholder="password"
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            label="Bio (a short description of yourself)"
            name="bio"
            data-testid="bio"
            placeholder="bio"
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            label="Location"
            name="location"
            data-testid="location"
            placeholder="location"
            onChange={this.handleChange}
          />
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    );
  }
}

export default SignUp;
