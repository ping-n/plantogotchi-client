import React from "react";
import { breeds } from "../../classes/BreedApi";
import { Button, Message, Table, Icon, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class Breeds extends React.Component {
  state = { breeds: [] };

  componentDidMount() {
    breeds
      .index()
      .then((res) => {
        if (res.status === 401) {
          throw new Error("You are not authorized to do that!");
        } else if (res.status >= 400) {
          throw new Error("Server Error");
        } else {
          this.setState({ breeds: res.data });
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  handleDelete(id, event) {
    event.preventDefault();
    breeds
      .delete(id)
      .then((res) => {
        if (res.status === 401) {
          throw new Error("You are not authorized to do that!");
        } else if (res.status === 422) {
          throw new Error(res.data.errors);
        } else if (res.status >= 400) {
          throw new Error("Server Error");
        } else {
          this.setState({
            breeds: this.state.breeds.filter(function (breed) {
              return breed.id !== id;
            }),
          });
          alert("You have successfully deleted the breed.");
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  render() {
    // Looping the state and print out data into a table
    const breedsArr = this.state.breeds.map((breed) => {
      return (
        <Table.Row key={breed.id}>
          <Table.Cell>{breed.id}</Table.Cell>
          <Table.Cell>{breed.name}</Table.Cell>
          <Table.Cell>{breed.description}</Table.Cell>
          <Table.Cell>
            {" "}
            <Link
              to={{
                pathname: `/breeds/edit/${breed.id}`,
                breed: { breed },
              }}
            >
              {" "}
              <Icon name="lab" />
              Edit
            </Link>
          </Table.Cell>
          <Table.Cell>
            <Button onClick={(e) => this.handleDelete(breed.id, e)}>
              Delete
            </Button>
          </Table.Cell>
        </Table.Row>
      );
    });
    return (
      <Container className="breed-wrapper">
        {this.state?.error && (
          <Message error data-testid="createbreed-error">
            {this.state.error}
          </Message>
        )}
        <Table inverted>
          <Table.Header>
            <Table.Row>
              {/* Breed Table Header */}
              <Table.HeaderCell>Breed ID</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{breedsArr}</Table.Body>
        </Table>
      </Container>
    );
  }
}
