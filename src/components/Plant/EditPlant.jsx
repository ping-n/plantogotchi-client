import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Message, Grid, Header, Segment } from "semantic-ui-react";
import { plants } from "../../classes/PlantApi";

export class EditPlant extends Component {
  state = {
    errorcode: "",
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = async (e) => {
    const { name } = this.state;

    plants
      .update(this.props.match.params.id, { plant: { name } })
      .then((res) => {
        if (res.status >= 400) {
          console.log(res);
          throw new Error(res.data);
        } else {
          alert("You have successfully updated plant!");
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
      <>
        {error && (
          <Message style={{fontFamily: "DigitalDisco-Thin"}} data-testid="plantupdate-error">{this.state.error}</Message>
        )}
        <Grid
          textAlign="center"
          verticalAlign="top"
        >
          <Grid.Column style={{ maxWidth: 500 }}>
            <Header as="h1" color="black">
              Create Plant
            </Header>
            <Form onSubmit={this.handleSubmit}>
              <Segment piled inverted>
                <Form.Input
                  fluid
                  label="Name"
                  name="name"
                  data-testid="name"
                  placeholder="name"
                  onChange={this.handleChange}
                />
                <Form.Button color="twitter">Update</Form.Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}

export default EditPlant;
