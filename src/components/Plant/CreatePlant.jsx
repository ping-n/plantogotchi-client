import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Form,
  Message,
  Select,
  Grid,
  Header,
  Segment,
} from "semantic-ui-react";
import { plants } from "../../classes/PlantApi";
import { breeds } from "../../classes/BreedApi";

export class CreatePlant extends Component {
  state = {
    errorcode: "",
    breed_arr: [],
    breed_name: null,
  };

  async componentDidMount() {
    await breeds.index().then((response) => {
      this.setState({ breed_arr: response.data });
    });
    const breed_name = this.state.breed_arr.map((breed, index) => {
      return { key: index, text: breed.name, value: breed.id };
    });
    this.setState({ breed_name: breed_name });
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async (e) => {
    const { name, breed_id } = this.state;
    const params = { plant: { name, breed_id } };
    plants
      .create(params)
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
      <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="top">
        <Grid.Column style={{ maxWidth: 500 }}>
          <Header as="h1" color="black">
            Create Plant
          </Header>
          {error && (
            <Message data-testid="createplant-error">
              {this.state.error}
            </Message>
          )}
          <Form onSubmit={this.handleSubmit}>
            <Segment piled>
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
              <Form.Button color="twitter">Submit</Form.Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default CreatePlant;
