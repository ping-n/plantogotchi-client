import React from "react";
import { plants } from "../classes/PlantApi";
import { Card, Image } from "semantic-ui-react";

export default class Plant extends React.Component {
  state = { plant: {} };

  componentDidMount() {
    plants
      .show(this.props.match.params.id)
      .then((res) => this.setState({ plant: res }))
      .catch((er) => console.log(er));
  }

  render() {
    const {
      id,
      alive,
      name,
      water_level,
      food_level,
      growth_stage,
      created_at,
    } = this.state.plant;
    const breed_name = this.state.plant.breed;
    console.log(breed_name);
    return (
      <Card>
        <Image src="" wrapped ui={false} />
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Meta>
            <span className="date">{created_at}</span>
          </Card.Meta>
          <Card.Description>
            {/* {name} is of the {breed_name} breed. */}
            <h3>water level: {water_level}</h3>
            <h3>food level: {food_level}</h3>
            <h3>growth stage: {growth_stage}</h3>
            {alive && <h3>they are alive!</h3>}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}
