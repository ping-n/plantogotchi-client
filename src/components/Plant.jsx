import React from "react";
import { plants } from "../classes/PlantApi";
import { breeds } from "../classes/BreedApi"
import { Card, Image } from "semantic-ui-react";
import WaterLevel from "./Plant/WaterLevel";

export default class Plant extends React.Component {
  state = { plant: {}, breed_name: '' };

  componentDidMount() {
    plants
      .show(this.props.match.params.id)
      .then((res) => this.setState({ plant: res.data }))
      .catch((er) => console.log(er));
    breeds
      .show(this.state.plant.breed_id)
      .then((res) => {
        console.log(res)
        this.setState({ breed_name: res.data.name })}
        )
      .catch((er) => console.log(er));
  }

  render() {
    const {
      id,
      alive,
      name,
      breed_id,
      water_level,
      food_level,
      growth_stage,
      created_at,
    } = this.state.plant;
    const breed_name = this.state.breed_name


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
            <WaterLevel id={id} level={100} />
            <h3>food level: {food_level}</h3>
            <h3>growth stage: {growth_stage}</h3>
            {alive && <h3>they are alive!</h3>}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}
