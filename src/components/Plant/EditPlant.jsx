import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Form, Message } from "semantic-ui-react";
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
          </Form.Group>

          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    );
  }
}

export default EditPlant
