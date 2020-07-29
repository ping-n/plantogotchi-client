import React from "react";
import { breeds } from "../../classes/BreedApi";
import { Table, Icon, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class Breeds extends React.Component {
  state = { breeds: [] };

  componentDidMount() {
    breeds
      .index()
      .then((res) => {
        console.log(res.data);
        this.setState({ breeds: res.data });
      })
      .catch((er) => console.log(er));
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
        </Table.Row>
      );
    });
    return (
      <Container className="breed-wrapper">
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
