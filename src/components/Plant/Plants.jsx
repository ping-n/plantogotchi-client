import React from "react";
import { plants } from "../../classes/PlantApi";
import PlantCard from "./PlantCard";
import { Grid } from "semantic-ui-react";

export default class Plants extends React.Component {
  state = { plants: [] };

  async componentDidMount() {
    await plants
      .index()
      .then((res) => {
        console.log(res.data);
        this.setState({ plants: res.data });
      })
      .catch((er) => console.log(er));
  }

  render() {
    const plantsArr = this.state.plants.map((plant, index) => {
      return (
        <Grid.Column key={index}>
          <PlantCard plant={plant} />
        </Grid.Column>
      );
    });

    return (
      <Grid columns={3} divided>
        <Grid.Row>{plantsArr}</Grid.Row>
      </Grid>
    );
  }
}
