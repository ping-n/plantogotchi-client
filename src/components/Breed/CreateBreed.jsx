import React, { Component } from "react";
import { Form, Message, Header, Grid, Segment } from "semantic-ui-react";
import { breeds } from "../../classes/BreedApi";
import { InputFile } from "semantic-ui-react-input-file";

class CreateBreed extends Component {
  state = {
    errorcode: "",
    spritesheet: null,
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleUpload = (e) => {
    this.setState({ spritesheet: e.target.files[0] });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const params = new FormData();
    params.set("[breed]name", this.state.name);
    params.set("[breed]description", this.state.description);
    params.set("[breed]max_growth", this.state.max_growth);
    params.append("[breed]spritesheet", this.state.spritesheet);
    await breeds
      .create(params)
      .then((res) => {
        if (res.status === 401) {
          throw new Error("You are not authorized to do that!");
        } else if (res.status === 422) {
          throw new Error(res.data.errors);
        } else if (res.status >= 400) {
          throw new Error("Server Error");
        } else {
          alert("You have successfully created a breed!");
          this.props.history.push("/breeds");
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  render() {
    return (
      <Grid textAlign="center" verticalAlign="top">
        <Grid.Column style={{ maxWidth: 500 }}>
          <Header as="h1" color="black">
            Create breed
          </Header>
          {this.state?.error && (
            <Message style={{fontFamily: "DigitalDisco-Thin"}} error data-testid="createbreed-error">
              {this.state.error}
            </Message>
          )}
          <Form onSubmit={this.handleSubmit}>
            <Segment piled inverted>
              <Form.Input
                required
                fluid
                icon="smile"
                iconPosition="left"
                label="Name"
                name="name"
                data-testid="name"
                placeholder="Name"
                onChange={this.handleChange}
              />
              <Form.Input
                required
                fluid
                icon="list"
                iconPosition="left"
                label="Description"
                name="description"
                data-testid="description"
                placeholder="Description"
                onChange={this.handleChange}
              />
              <Form.Input
                required
                fluid
                icon="list"
                iconPosition="left"
                label="Maximum Growth (total number of sprites in spritesheet)"
                name="max_growth"
                data-testid="max_growth"
                placeholder="Max Growth"
                onChange={this.handleChange}
              />
              <InputFile
                style={{ color: "black" }}
                input={{
                  id: "input-control-id",
                  onChange: this.handleUpload,
                }}
              />
              <Form.Button color="twitter">Submit</Form.Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default CreateBreed;
