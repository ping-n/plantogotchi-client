import React, { Component } from "react";
import {
  Icon,
  Message,
  Button,
  Form,
  Header,
  Grid,
  Segment,
} from "semantic-ui-react";
import { users } from "../../classes/UserApi";
import Auth from "../auth/Auth";

class Login extends Component {
  state = { error: "" };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    users
      .login({ auth: { email, password } })
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
  };

  render() {
    const { error } = this.state;
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 500 }}>
          <Header as="h1" black>
            Login
          </Header>
          {error && (
            <Message data-testid="login-error">{this.state.error}</Message>
          )}
          <Form onSubmit={this.handleSubmit}>
            <Segment piled>
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
              <Button color="twitter" animated type="submit">
                <Button.Content visible>Next</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
