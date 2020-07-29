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
import Auth from "../auth/Auth";

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
    const admin = await Auth.isAdmin();
    if (admin) {
      this.setState({ admin: true });
    }
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
          throw new Error("Server Error");
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
        // this.setState(error.message);
        console.log(error);
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
              <Header
                as="h3"
                style={{ fontFamily: "DigitalDisco-Thin", paddingTop: "5px" }}
              >
                Water Level Drop Rate
              </Header>
              <Slider
                style={{ margin: "20px 0px 20px 0px" }}
                defaultValue={1}
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
                defaultValue={1}
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
          </Grid>
        </Container>
      );
    }
  }
}
