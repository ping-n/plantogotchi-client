import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Message, Header } from "semantic-ui-react";
import { users } from "../../classes/UserApi";

export class MyAccount extends Component {
  state = { error: "" };

  componentDidMount() {
    users.show().then((res) => {
      for (let obj in res.data) {
        this.setState({ [obj]: res.data[obj] });
      }
    });
  }

  handleChange = (e, { name, value }) =>
    this.setState({ ["new" + name]: value });

  handleSubmit = async (e) => {
    const params = {};
    if (this.state.newusername) params.username = this.state.newusername;
    if (this.state.newemail) params.email = this.state.newemail;
    if (this.state.newpassword) params.password = this.state.newpassword;
    if (this.state.newbio) params.bio = this.state.newbio;
    if (this.state.newlocation) params.location = this.state.newlocation;
    users
      .update({ user: params })
      .then((res) => {
        if (res.status >= 400) {
          console.log(res);
          throw new Error(res.data);
        } else {
          alert("You have successfully updated your details");
          this.props.history.push("/plants");
          return <Redirect to="/plants" />;
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
        <Header as="h1" black >My Account</Header>
        {error && (
          <Message data-testid="signup-error">{this.state.error}</Message>
        )}
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            fluid
            label="Username"
            name="username"
            data-testid="username"
            placeholder={this.state.username}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            label="Email"
            name="email"
            data-testid="email"
            placeholder={this.state.email}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            label="Password"
            name="password"
            data-testid="password"
            placeholder=""
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            label="Bio (a short description of yourself)"
            name="bio"
            data-testid="bio"
            placeholder={this.state.bio}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            label="Location"
            name="location"
            data-testid="location"
            placeholder={this.state.bio}
            onChange={this.handleChange}
          />
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    );
  }
}

export default MyAccount;
