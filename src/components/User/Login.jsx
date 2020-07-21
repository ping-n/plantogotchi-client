import React, { Component } from "react";
import { Icon, Message, Button, Form } from "semantic-ui-react";
import { users } from "../../classes/UserApi";
import Auth from "../auth/Auth";

class Login extends Component {
  state = { email: "", password: "", error: "" };

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
      <div className="container">
        <h1>Login</h1>
        {error && (
          <Message data-testid="login-error">{this.state.error}</Message>
        )}
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="Email"
            name="email"
            placeholder="email"
            onChange={this.handleChange}
          />
          <Form.Input
            label="Password"
            name="password"
            placeholder="password"
            onChange={this.handleChange}
          />
          <Button animated type="submit">
            <Button.Content visible>Next</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
