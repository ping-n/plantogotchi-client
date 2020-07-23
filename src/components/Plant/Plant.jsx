import React from "react";
import { Redirect } from "react-router-dom";
import { plants } from "../../classes/PlantApi";
import { breeds } from "../../classes/BreedApi";
import { Card, Button } from "semantic-ui-react";
import CanvasWindow from "./CanvasWindow";
import { game } from "../logic/Game";

export default class Plant extends React.Component {
  state = { plant: this.props.location.plant.plant, watering_amount: "" };

  handleDeleteClick = (e) => {
    plants
      .delete(this.props.match.params.id)
      .then((res) => {
        if (res.status >= 400) {
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
  };

  async componentDidMount() {
    if (!this.state.plant) {
      await plants
        .show(this.props.match.params.id)
        .then((res) => this.setState({ plant: res.data }))
        .catch((er) => console.log(er));
    }
    await breeds
      .show(this.state.plant.breed_id)
      .then((res) => {
        this.setState({ breed_name: res.data.name });
        this.setState({ sprite: res.data.spritesheet });
        this.setState({ max_growth: res.data.max_growth });
      })
      .catch((er) => console.log(er));
    if (
      this.state.plant.alive ||
      this.state.plant.growth_stage !== this.state.max_growth
    ) {
      this.setState({ status: "alive" });
      this.startGame();
    } else {
      alert("Please create a new plant!!");
      this.setState({ finished: true });
    }
  }

  startGame() {
    const { id } = this.state.plant;
    let sec = 0;
    let gameLoop = setInterval(() => {
      if (sec % game.water_drop_speed === 0) {
        this.changeWaterLevel(id);
      }
      this.grow(sec, id);
      this.isThirsty(id);
      if (
        !this.state.plant.alive ||
        this.state.plant.growth_stage === this.state.max_growth
      ) {
        alert("the game has finished!");
        clearInterval(gameLoop);
        this.setState({ status: "finished" });
      }
      sec += 1;
    }, game.game_speed);
  }

  async grow(sec, id) {
    if (sec % game.growth_speed === 0 && this.state.plant.water_level >= 50) {
      const growth = (this.state.plant.growth_stage += 1);
      const params = {
        plant: {
          growth_stage: growth,
        },
      };
      const res = await plants.update(id, params);
      if (res.status >= 400) {
        throw new Error("Server error");
      } else {
        this.setState({ plant: { ...this.state.plant, growth_stage: growth } });
      }
    }
  }

  async changeWaterLevel(id, amount) {
    let water_level = this.state.plant.water_level;
    if (amount) {
      water_level += amount;
    } else {
      water_level -= 1;
      console.log("here");
    }
    console.log(water_level);
    const params = {
      plant: {
        water_level: water_level,
      },
    };
    const res = await plants.update(id, params);
    if (res.status >= 400) {
      throw new Error("Server error");
    } else {
      this.setState({
        plant: { ...this.state.plant, water_level: water_level },
      });
    }
  }

  async isThirsty(id) {
    if (this.water_level === 0) {
      const params = {
        plant: {
          alive: false,
        },
      };
      const res = await plants.update(id, params);
      if (res.status >= 400) {
        throw new Error("Server error");
      } else {
        this.setState({ plant: { ...this.state.plant, alive: false } });
        this.setState({ status: "dead" });
      }
    }
  }

  onMouseHold(event) {
    // let watering_amount = 1;
    // console.log("here");
    // let waterLoop = setInterval(() => {
    //   if (event.type === "mousedown") {
    //     watering_amount += 1;
    //     this.setState({ watering_amount: watering_amount });
    //     console.log("in the water loop");
    //   } else {
    //     clearInterval(waterLoop);
    //   }
    // }, 333);
    if (event.type === "mousedown") {
      this.setState({ watering_amount: "Mouse Down" });
    } else {
      this.setState({ watering_amount: "Mouse Up" });
    }
  }

  render() {
    const {
      alive,
      name,
      water_level,
      growth_stage,
      created_at,
    } = this.state.plant;
    const { sprite, max_growth, breed_name, finished, status } = this.state;
    return (
      <>
        {finished && <h1>This plant is finished!</h1>}
        <Card>
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Meta>
              <span className="date">{created_at}</span>
            </Card.Meta>
            <Card.Description>
              {name} is of the {breed_name} breed.
              <h3>{water_level}</h3>
              <h3>growth stage: {growth_stage}</h3>
              {alive && <h3>they are {status}!</h3>}
            </Card.Description>
          </Card.Content>
          <Button onClick={this.handleDeleteClick}>Delete</Button>
          <h3>{this.state.watering_amount}</h3>
          <Button onMouseDown={this.onMouseHold} onMouseUp={this.onMouseHold}>
            Water
          </Button>
        </Card>
        <div>
          {this.state.sprite && (
            <CanvasWindow
              width={200}
              height={192}
              maxFrame={max_growth}
              frame={growth_stage}
              sprite={sprite}
            />
          )}
        </div>
      </>
    );
  }
}
