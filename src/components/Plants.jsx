import React from "react";
import { plants } from "../classes/PlantApi";
import PlantCard from "./PlantCard";
import { Grid } from "semantic-ui-react";

export default class Plants extends React.Component {
  state = { plants: [] };

  componentDidMount() {
    plants
      .index()
      .then((res) => {
        console.log(res)
        this.setState({ plants: res.data })
      })
      .catch((er) => console.log(er));
  }

  render() {
    const plantsArr = this.state.plants.map((plant, index) => {
      return (
        <Grid.Column>
          <PlantCard
            key={index}
            id={plant.id}
            alive={plant.alive}
            name={plant.name}
            water_level={plant.water_level}
            food_level={plant.food_level}
            growth_stage={plant.growth_stage}
            breed_name={plant.breed.name}
            created_at={plant.created_at}
          />
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
