import React from "react";
import { breeds } from "../../classes/BreedApi";
import BreedCard from "./BreedCard";
import { Grid } from "semantic-ui-react";

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
    const breedsArr = this.state.breeds.map((breed, index) => {
      return (
        <Grid.Column>
          <BreedCard key={index} breed={breed} />
        </Grid.Column>
      );
    });

    return (
      <Grid columns={3} divided>
        <Grid.Row>{breedsArr}</Grid.Row>
      </Grid>
    );
  }
}
