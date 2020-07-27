import React, { Component } from "react";
import { Redirect } from "react-router-dom";
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
        if (res.status >= 400) {
          console.log(res.data.errors);
          throw new Error(res.data.errors);
        } else {
          alert("You have successfully created a breed!");
          this.props.history.push("/login");
          return <Redirect to="/login" />;
        }
      })
      .catch((error) => {
        let errorArray = [];
        for (error in error) {
          errorArray.push(error);
        }
        this.setState({ errors: errorArray });
      });
  };

  render() {
    return (
      <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="top">
        <Grid.Column style={{ maxWidth: 500 }}>
          <Header as="h1" color="black">
            Create breed
          </Header>
          {this.state?.errors && (
            <Message
              error
              data-testid="createbreed-error"
              header="There were some errors with your submission"
              list={this.state.errors}
            />
          )}
          <Form onSubmit={this.handleSubmit}>
            <Segment piled>
              <Form.Input
                fluid
                error="Please enter the Breed/'s name"
                label="Name"
                name="name"
                data-testid="name"
                placeholder="name"
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                error="Please enter the Breed/'s description"
                label="Description"
                name="description"
                data-testid="description"
                placeholder="description"
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                error="Please enter the Breed/'s maximum growth"
                label="Maximum Growth (total number of sprites in spritesheet)"
                name="max_growth"
                data-testid="max_growth"
                placeholder="Max Growth"
                onChange={this.handleChange}
              />
              <InputFile
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
