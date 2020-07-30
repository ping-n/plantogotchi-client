import React from "react";
import { plants } from "../../classes/PlantApi";
import Plant from "./Plant";
import {
  Segment,
  Dimmer,
  Loader,
  Message,
  Grid,
  Header,
  Image,
  Container,
} from "semantic-ui-react";
import { Slider } from "rsuite";
import { Link } from "react-router-dom";
import Auth from "../auth/Auth";

export default class Plants extends React.Component {
  state = {
    plants: [],
    growth_speed: 1,
    water_drop_speed: 6,
    game_speed: 10000,
    growth_limit: 50,
    loading: true,
  };

  // Lifestyle methods

  componentDidMount = async () => {
    // Admin check for conditional rendering of game speed sliders.
    const admin = await Auth.isAdmin();
    if (admin) {
      this.setState({ admin: true });
    }
    await this.getPlants();
    this.setState({ loading: false });
  };

  // Data manipulation

  // Main API Call for plants array.
  getPlants = async () => {
    this.setState({ loading: true });
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
  };

  // Finds the state plants array index of a plant with a given id.
  findPlant = (id) => {
    return this.state.plants.findIndex((plant) => {
      return plant.id === id;
    });
  };

  // Creates new array with intended changes, then overwrites array in state.
  updateArray = (id, target, value) => {
    const newArray = this.state.plants;
    newArray[this.findPlant(id)][`${target}`] = value;
    this.setState({ plants: newArray });
  };

  // Destroys plant in rails db and state.
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
          throw new Error("Server Error");
        } else {
          this.updateArray(id, "alive", false);
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  // Changes growth stage in rails db and state.
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
          throw new Error("Server Error");
        } else {
          this.updateArray(id, "growth_stage", growth);
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  // Changes water level in rails db and state.
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
    console.log(`Plants: ${id}`);
    await plants
      .delete(id)
      .then((res) => {
        if (res.status >= 400) {
          throw new Error("Server Error");
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

  // For changing variables that effect rates of change in gameplay.
  handleSlider = (value, type) => {
    switch (type) {
      case 0:
        this.setState({ water_drop_speed: value });
        break;
      case 1:
        this.setState({ growth_speed: value });
        break;
      default:
        this.setState({ game_speed: value });
        break;
    }
  };

  // Render

  render() {
    if (this.state.loading) {
      return (
        <Segment>
          <Dimmer active inverted>
            <Loader size="massive">Loading</Loader>
          </Dimmer>
          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
        </Segment>
      );
    } else {
      const {
        game_speed,
        growth_speed,
        growth_limit,
        water_drop_speed,
      } = this.state;
      const plantsArr = this.state.plants.map((plant, index) => {
        return (
          <Grid.Column key={plant.id}>
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
        <Container>
          {this.state?.error && (
            <Message
              style={{ fontFamily: "DigitalDisco-Thin" }}
              data-testid="plants-error"
            >
              {this.state.error}
            </Message>
          )}
          <Header as="h1" color="black">
            Your Plants
          </Header>
          {this.state?.admin && (
            <>
              <Header
                as="h3"
                style={{ fontFamily: "DigitalDisco-Thin", paddingTop: "5px" }}
              >
                Game Speed Intervals in Milliseconds
              </Header>
              <Slider
                style={{ margin: "20px 0px 20px 0px" }}
                defaultValue={this.state.game_speed}
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
              <Header
                as="h3"
                style={{ fontFamily: "DigitalDisco-Thin", paddingTop: "5px" }}
              >
                Water Level Drop Rate
              </Header>
              <Slider
                style={{ margin: "20px 0px 20px 0px" }}
                defaultValue={this.state.water_drop_speed}
                min={1}
                step={1}
                max={10}
                graduated
                progress
                renderMark={(mark) => {
                  return mark;
                }}
                onChange={(value) => this.handleSlider(value, 0)}
              />
              <Header
                as="h3"
                style={{ fontFamily: "DigitalDisco-Thin", paddingTop: "5px" }}
              >
                Plant Growth Rate
              </Header>
              <Slider
                style={{ margin: "20px 0px 20px 0px" }}
                defaultValue={this.state.growth_speed}
                min={1}
                step={1}
                max={10}
                graduated
                progress
                renderMark={(mark) => {
                  return mark;
                }}
                onChange={(value) => this.handleSlider(value, 1)}
              />
            </>
          )}
          <Grid stackable style={{ marginTop: 50 }} columns={3} divided>
            {plantsArr}
            {plantsArr.length === 0 && (
              <Header
                as="h2"
                style={{
                  fontFamily: "DigitalDisco-Thin",
                  paddingTop: "5px",
                  color: "white",
                }}
              >
                Looks like you don't have any plants. Click
                <Link data-testid="createplant" to="/createplant">
                  here
                </Link>
                to get started.
              </Header>
            )}
          </Grid>
        </Container>
      );
    }
  }
}
