import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Message, Header, Segment, Grid } from "semantic-ui-react";
import { users } from "../../classes/UserApi";

export class SignUp extends Component {
  state = { error: "" };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async (e) => {
    const { username, email, password, bio, location } = this.state;
    users
      .signup({ user: { username, email, password, bio, location } })
      .then((res) => {
        if (res.status === 422) {
          throw new Error(res.data.errors);
        } else if (res.status >= 400) {
          throw new Error("Server Error");
        } else {
          alert("You have successfully created an account! Please log in.");
          this.props.history.push("/login");
          return <Redirect to="/login" />;
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  render() {
    return (
      <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="top">
        <Grid.Column style={{ maxWidth: 500 }}>
          <Header as="h1" color="black">
            Sign Up
          </Header>
          {this.state?.error && (
            <Message error data-testid="signup-error">
              <ul>{this.state.error}</ul>
            </Message>
          )}
          <Form onSubmit={this.handleSubmit}>
            <Segment piled>
              <Form.Input
                icon="user"
                iconPosition="left"
                label="Username"
                name="username"
                data-testid="username"
                placeholder="username"
                onChange={this.handleChange}
              />
              <Form.Input
                icon="envelope"
                iconPosition="left"
                label="Email"
                name="email"
                data-testid="email"
                placeholder="Email"
                onChange={this.handleChange}
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                label="Password"
                name="password"
                data-testid="password"
                placeholder="Password"
                type="password"
                onChange={this.handleChange}
              />
              <Form.Input
                icon="heart"
                iconPosition="left"
                label="Bio (a short description of yourself)"
                name="bio"
                data-testid="bio"
                placeholder="Bio"
                onChange={this.handleChange}
              />
              <Form.Input
                icon="location arrow"
                iconPosition="left"
                label="Location"
                name="location"
                data-testid="location"
                placeholder="Location"
                onChange={this.handleChange}
              />
              <Form.Button color="twitter">Submit</Form.Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default SignUp;
