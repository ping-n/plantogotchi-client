import React from "react";
import { plants } from "../../classes/PlantApi";
import Plant from "./Plant";
import { Message, Grid, Header } from "semantic-ui-react";
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

  // Lifestyle methods

  componentDidMount = async () => {
    await plants
      .index()
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(res.data);
        } else {
          this.setState({ plants: res.data });
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      });
    this.setState({ loading: false });
  };

  // Data manipulation

  findPlant = (id) => {
    return this.state.plants.findIndex((plant) => {
      return plant.id === id;
    });
  };

  updateArray = (id, target, value) => {
    const newArray = this.state.plants;
    newArray[this.findPlant(id)][`${target}`] = value;
    this.setState({ plants: newArray });
  };

  killPlant = async (id) => {
    const params = {
      plant: {
        alive: false,
      },
    };
    await plants
      .update(id, params)
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(res.data);
        } else {
          this.updateArray(id, "alive", false);
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  grow = async (id, growth) => {
    const params = {
      plant: {
        growth_stage: growth,
      },
    };
    await plants
      .update(id, params)
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(res.data);
        } else {
          this.updateArray(id, "growth_stage", growth);
        }
      })
      .catch((error) => {
        this.setState(error.message);
      });
  };

  changeWaterLevel = async (id, water_level) => {
    const params = {
      plant: {
        water_level: water_level,
      },
    };
    await plants
      .update(id, params)
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(res.data);
        } else {
          this.updateArray(id, "water_level", water_level);
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      });
  };

  // Event handling

  handleDeleteClick = async (e, id) => {
    await plants
      .delete(id)
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(res.data);
        } else {
          this.setState({
            plants: this.state.plants.filter(function (plant) {
              return plant.id !== id;
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

  handleSlider = (value) => {
    this.setState({ game_speed: value });
  };

  // Render

  render() {
    if (this.state.loading) {
      return <h3>Loading!</h3>;
    } else {
      const {
        game_speed,
        growth_speed,
        growth_limit,
        water_drop_speed,
      } = this.state;
      const plantsArr = this.state.plants.map((plant, index) => {
        return (
          <Grid.Column key={index}>
            <Plant
              plant={plant}
              updateArray={this.updateArray}
              handleDeleteClick={this.handleDeleteClick}
              changeWaterLevel={this.changeWaterLevel}
              killPlant={this.killPlant}
              grow={this.grow}
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
          {this.state?.error && (
            <Message data-testid="plants-error">{this.state.error}</Message>
          )}
          <Header as="h1" color="black">
            Your Plants
          </Header>
          <h3>Game Speed Intervals in Milliseconds</h3>
          <Slider
            style={{ margin: "20px 0px 20px 0px" }}
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
          <Grid style={{ marginTop: 50 }} columns={3} divided>
            {plantsArr}
          </Grid>
        </>
      );
    }
  }
}
