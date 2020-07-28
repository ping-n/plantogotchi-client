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
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Breed</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Show</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{breedsArr}</Table.Body>
          </Table>
      </Container>
    );
  }
}
