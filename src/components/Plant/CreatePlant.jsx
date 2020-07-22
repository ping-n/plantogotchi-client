import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Message, Select } from "semantic-ui-react";
import { plants } from "../../classes/PlantApi";
import { breeds } from "../../classes/BreedApi";

export class CreatePlant extends Component {
  state = {
    errorcode: "",
    breed_arr: [],
    breed_name: null,
  };

  async componentDidMount() {
    const response = await breeds.index();
    if (response.status >= 400) {
      throw new Error("broken");
    } else {
      this.setState({ breed_arr: response.data });
    }
    console.log(this.state.breed_arr);
    const breed_name = this.state.breed_arr.map((breed, index) => {
      return {key: index, text: breed.name, value: breed.id }
    });

    console.log(breed_name);
    this.setState({ breed_name: breed_name });
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async (e) => {
    const { name, breed_id } = this.state;

    plants
      .create({ plant: { name, breed_id} })
      .then((res) => {
        if (res.status >= 400) {
          console.log(res);
          throw new Error(res.data);
        } else {
          alert("You have successfully created a plants!");
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
        <h1>Create Plant</h1>
        {error && (
          <Message data-testid="signup-error">{this.state.error}</Message>
        )}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Name"
              name="name"
              data-testid="name"
              placeholder="name"
              onChange={this.handleChange}
            />
            {this.state.breed_name && (
              <Form.Field
                control={Select}
                label="Breed"
                name="breed_id"
                options={this.state.breed_name}
                placeholder="Breed"
                onChange={this.handleChange}
              />
            )}
          </Form.Group>

          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    );
  }
}

export default CreatePlant;