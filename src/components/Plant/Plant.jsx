import React from "react";
import { Redirect } from "react-router-dom";
import { plants } from "../../classes/PlantApi";
import { breeds } from "../../classes/BreedApi";
import { Card, Image, Button } from "semantic-ui-react";
import WaterLevel from "./WaterLevel";

export default class Plant extends React.Component {
  state = { plant: this.props.location.plant.plant, breed_name: "" };

  handleClick= (e) => {
    console.log(this.props.match.params.id);
    plants
      .delete(this.props.match.params.id)
      .then((res) => {
        if (res.status >= 400) {
          console.log(res);
          throw new Error(res.data);
        } else {
          alert("You have successfully deleted a plant!");
          this.props.history.push("/plants");
          return <Redirect to="/plants" />;
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      });
  }

  componentDidMount() {
    console.log(this.props.location.plant);
    if (!this.state.plant) {
      plants
        .show(this.props.match.params.id)
        .then((res) => this.setState({ plant: res.data }))
        .catch((er) => console.log(er));
    }
    breeds
      .show(this.state.plant.breed_id)
      .then((res) => {
        console.log(res);
        this.setState({ breed_name: res.data.name });
      })
      .catch((er) => console.log(er));
  }

  updateWaterLevel(id, level) {
    const params = {
      plant: {
        water_level: level,
      },
    };
    plants.update(id, params);
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
    const breed_name = this.state.breed_name;

    return (
      <Card>
        <Image src="" wrapped ui={false} />
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Meta>
            <span className="date">{created_at}</span>
          </Card.Meta>
          <Card.Description>
            {name} is of the {breed_name} breed.
            <WaterLevel
              id={id}
              level={water_level}
              updateWaterLevel={this.updateWaterLevel}
            />
            <h3>food level: {food_level}</h3>
            <h3>growth stage: {growth_stage}</h3>
            {alive && <h3>they are alive!</h3>}
          </Card.Description>
        </Card.Content>
        <Button onClick={this.handleClick}>Delete</Button>
      </Card>
    );
  }
}
