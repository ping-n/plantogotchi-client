import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Message } from "semantic-ui-react";
import { breeds } from "../../classes/BreedApi";
import { InputFile } from "semantic-ui-react-input-file";

class EditBreed extends Component {
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
    if (this.state.name) params.set("[breed]name", this.state.name);
    if (this.state.description)
      params.set("[breed]description", this.state.description);
    if (this.state.max_growth)
      params.set("[breed]max_growth", this.state.max_growth);
    if (this.state.spritesheet)
      params.append("[breed]spritesheet", this.state.spritesheet);
    breeds
      .update(this.props.match.params.id, params)
      .then((res) => {
        if (res.status >= 400) {
          console.log(res);
          throw new Error(res.data);
        } else {
          alert("You have successfully updated a breed!");
          this.props.history.push("/breeds");
          return <Redirect to="/breeds" />;
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      });
  };

  render() {
    const { breed } = this.props.location;
    const { error } = this.state;
    return (
      <div className="container">
        <h1>Update breed</h1>
        {error && (
          <Message data-testid="breedupdate-error">{this.state.error}</Message>
        )}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Name"
              name="name"
              data-testid="name"
              placeholder={breed.name}
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="Description"
              name="description"
              data-testid="description"
              placeholder={breed.description}
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="Max Growth (total number of sprites in spritesheet)"
              name="max_growth"
              data-testid="max_growth"
              placeholder={breed.max_growth}
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

export default EditBreed;
