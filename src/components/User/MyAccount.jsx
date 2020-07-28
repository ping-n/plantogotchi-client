import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Message, Header, Grid, Segment } from "semantic-ui-react";
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
        if (res.status === 422) {
          console.log(res);
          throw new Error(res.data.errors);
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
      <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="top">
        <Grid.Column style={{ maxWidth: 500 }}>
          <Header as="h1" color="black">
            Edit Account
          </Header>
          {error && (
            <Message error data-testid="account-error">
              {this.state.error}
            </Message>
          )}
          <Form onSubmit={this.handleSubmit}>
            <Segment>
              <Header as="h3" color="black">
                Update your details below:
              </Header>
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
              <Form.Button color="twitter">Submit</Form.Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default MyAccount;
