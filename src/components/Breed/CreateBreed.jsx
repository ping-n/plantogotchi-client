import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Message } from "semantic-ui-react";
import { breeds } from "../classes/BreedApi";
import { InputFile } from "semantic-ui-react-input-file";

export class CreateBreed extends Component {
  state = {
    name: "",
    description: "",
    max_growth: "",
    errorcode: "",
    spritesheet: "",
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleUpload = (e) => {
    if (e.target.files[0]) this.setState({ spritesheet: e.target.files[0] });
  };

  handleSubmit = async (e) => {
    const { name, description, max_growth, spritesheet } = this.state;
    breeds
      .create({ breed: { name, description, max_growth, spritesheet } })
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
              button={{ ...buttonProps }}
              input={{
                id: "input-control-id",
                onChange: handleUpload,
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
