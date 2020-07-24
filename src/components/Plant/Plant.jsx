import React from "react";
import { Redirect } from "react-router-dom";
import { plants } from "../../classes/PlantApi";
import { breeds } from "../../classes/BreedApi";
import { Card, Button } from "semantic-ui-react";
import CanvasWindow from "./CanvasWindow";
import { game } from "../logic/Game";
import { Slider } from "rsuite";

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
    this.calculateDifference();
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

  componentWillUnmount() {
    clearInterval(this.gameLoop);
  }

  startGame() {
    const { id } = this.state.plant;
    let sec = 0;
    this.gameLoop = setInterval(() => {
      if (sec % game.water_drop_speed === 0) {
        this.changeWaterLevel(id, -1);
      }
      this.shouldGrow(sec, id);
      this.isThirsty(id);
      if (
        !this.state.plant.alive ||
        this.state.plant.growth_stage === this.state.max_growth
      ) {
        alert("the game has finished!");
        clearInterval(this.gameLoop);
        this.setState({ status: "finished" });
      }
      sec += 1;
    }, game.game_speed);
  }

  shouldGrow(sec, id) {
    if (
      sec % game.growth_speed === 0 &&
      this.state.plant.water_level >= game.growth_limit
    ) {
      const growth = this.state.plant.growth_stage + 1;
      this.grow(id, growth);
    }
  }

  async grow(id, growth) {
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

  async changeWaterLevel(id, amount) {
    let water_level = this.state.plant.water_level;
    water_level += amount;
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

  handleWaterClick(event) {
    this.changeWaterLevel(this.state.plant.id, 5);
  }

  calculateDifference() {
    const id = this.state.plant.id;
    const updatedTime = new Date(this.state.plant.updated_at);
    const nowTime = new Date(Date.now());
    const difference = nowTime - updatedTime;
    const originalWaterLevel = this.state.plant.water_level;
    this.calculateWaterDrop(id, difference);
    this.calculateGrowth(id, originalWaterLevel);
  }

  calculateWaterDrop(id, difference) {
    const water_drop = Math.round(
      difference / (game.water_drop_speed * game.game_speed)
    );
    if (water_drop > this.state.water_level) {
      this.changeWaterLevel(id, -Math.abs(this.state.plant.water_level));
    } else {
      this.changeWaterLevel(id, -Math.abs(water_drop));
    }
    return;
  }

  calculateGrowth(id, originalWaterLevel) {
    if (originalWaterLevel > game.growth_limit) {
      const growth =
        (originalWaterLevel - game.growth_limit) * game.growth_speed;
      this.grow(id, growth);
    }
  }

  handleSlider(value) {
    game.game_speed = value;
    clearInterval(this.gameLoop);
    this.startGame();
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
        {finished && <h1>This plant is finished!</h1>}
        <Card style={{ marginTop: 10 }}>
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
          <button
            onClick={(e) => {
              this.handleWaterClick(e);
            }}
          >
            Water
          </button>
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
