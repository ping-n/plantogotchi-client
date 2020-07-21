import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Message } from "semantic-ui-react";
import { breeds } from "../../classes/BreedApi";
import { InputFile } from "semantic-ui-react-input-file";

class CreateBreed extends Component {
  state = {
    name: "",
    description: "",
    max_growth: "",
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
    breeds
      .create(params)
      .then((res) => {
        if (res.status >= 400) {
          console.log(res);
          throw new Error(res.data);
        } else {
          alert("You have successfully created a breed!");
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
        <h1>Create breed</h1>
        {error && (
          <Message data-testid="signup-error">{this.state.error}</Message>
        )}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Name"
              name="name"
              placeholder="name"
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="Description"
              name="description"
              placeholder="description"
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="Max Growth (total number of sprites in spritesheet)"
              name="max_growth"
              placeholder="max_growth"
              onChange={this.handleChange}
            />
            <InputFile
              input={{
                id: "input-control-id",
                onChange: this.handleUpload,
              }}
            />
          </Form.Group>

          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    );
  }
}

export default CreateBreed;
