import React from "react";
import { plants } from "../../classes/PlantApi";
import Plant from "./Plant";
import { Grid } from "semantic-ui-react";
import { Slider } from "rsuite";

export default class Plants extends React.Component {
  state = {
    plants: [],
    growth_speed: 1,
    water_drop_speed: 1,
    game_speed: 5000,
    growth_limit: 50,
    loading: true,
  };

  async componentDidMount() {
    await plants
      .index()
      .then((res) => {
        this.setState({ plants: res.data });
      })
      .catch((er) => console.log(er));
    this.setState({ loading: false });
  }

  findPlant(id) {
    return this.state.plants.findIndex((plant) => {
      return plant.id === id;
    });
  }

  updateArray(id, target, value) {
    const newArray = this.state.plants;
    console.log(this.findPlant(id));
    // console.log(newArray[this.findPlant(id)][`${target}`]);
    // newArray[this.findPlant(id)][`${target}`] = value;
    // this.setState({ plants: newArray });
  }

  handleDeleteClick = (e, id) => {
    plants
      .delete(id)
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(res.data);
        } else {
          this.setState({
            plants: this.state.plants.filter(function (plant) {
              if (plant.id !== id) return plant;
            }),
          });
        }
        alert("You have successfully deleted a plant!");
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      });
  };

  handleSlider(value) {
    this.setState({ game_speed: value });
  }

  render() {
    if (this.state.loading) {
      return <h3>Loading!</h3>;
    } else {
      this.updateArray(37, "water_level");
      const {
        game_speed,
        growth_speed,
        growth_limit,
        water_drop_speed,
      } = this.state;
      const plantsArr = this.state.plants.map((plant, index) => {
        return (
          <Grid.Column>
            <Plant
              key={index}
              plant={plant}
              handleDeleteClick={this.handleDeleteClick}
              game_speed={game_speed}
              growth_speed={growth_speed}
              water_drop_speed={water_drop_speed}
              growth_limit={growth_limit}
            />
          </Grid.Column>
        );
      });
      return (
        <>
          <h3>Game Speed Intervals in Milliseconds</h3>
          <Slider
            style={{ margin: "10px 0px 10px 0px" }}
            defaultValue={5000}
            min={500}
            step={500}
            max={10000}
            graduated
            progress
            renderMark={(mark) => {
              return mark;
            }}
            onChange={(value) => this.handleSlider(value)}
          />
          <h1>Your Plants</h1>
          <Grid columns={3} divided>
            <Grid.Row>{plantsArr}</Grid.Row>
          </Grid>
        </>
      );
    }
  }
}
