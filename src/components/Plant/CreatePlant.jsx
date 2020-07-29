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
    await breeds
      .index()
      .then((response) => {
        if (response.status === 401) {
          throw new Error("Unauthorized");
        } else if (response.status > 401) {
          throw new Error("Server Error");
        } else {
          this.setState({ breed_arr: response.data });
          const breed_name = this.state.breed_arr.map((breed, index) => {
            return { key: index, text: breed.name, value: breed.id };
          });
          this.setState({ breed_name: breed_name });
        }
      })
      .catch((error) => this.setState({ error: error.message }));
  }

// Event methods
  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async (e) => {
    const { name, breed_id } = this.state;
    const params = { plant: { name, breed_id } };
    plants
      .create(params)
      .then((res) => {
        if (res.status >= 400) {
          throw new Error("You must select a breed.");
        } else {
          alert("You have successfully created a plant!");
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
      <Grid textAlign="center" verticalAlign="top">
        <Grid.Column style={{ maxWidth: 500 }}>
          <Header as="h1" color="black">
            Create Plant
          </Header>
          {error && (
            <Message style={{fontFamily: "DigitalDisco-Thin"}} error data-testid="createplant-error">
              {this.state.error}
            </Message>
          )}
          <Form onSubmit={this.handleSubmit}>
            <Segment piled inverted>
              <Form.Input
                fluid
                icon="heart"
                iconPosition="left"
                label="Name"
                name="name"
                data-testid="name"
                placeholder="Name"
                onChange={this.handleChange}
                required
              />
              {this.state.breed_name && (
                <Form.Field
                  control={Select}
                  label="Breed"
                  name="breed_id"
                  data-testid="breed"
                  options={this.state.breed_name}
                  placeholder="Breed"
                  onChange={this.handleChange}
                  required
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
