import React from "react";
import { plants } from "../../classes/PlantApi";
import { Card, Button } from "semantic-ui-react";
import CanvasWindow from "./CanvasWindow";

export default class Plant extends React.Component {
  state = { plant: this.props.plant, loading: true };

  componentDidMount() {
    console.log(this.state.plant.breed);
    this.setState({ breed: this.state.plant.breed });
    this.setState({ loading: false });
    this.calculateDifference();
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

  // Intitial calculations

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
      difference / (this.props.water_drop_speed * this.props.game_speed)
    );
    if (water_drop > this.state.water_level) {
      this.changeWaterLevel(id, -Math.abs(this.state.plant.water_level));
    } else {
      this.changeWaterLevel(id, -Math.abs(water_drop));
    }
    return;
  }

  calculateGrowth(id, originalWaterLevel) {
    if (originalWaterLevel > this.props.growth_limit) {
      const growth =
        (originalWaterLevel - this.props.growth_limit) *
        this.props.growth_speed;
      console.log(`growth: ${growth}`);
      this.grow(id, growth);
    }
  }

  // Main this.props logic

  startGame() {
    const { id } = this.state.plant;
    let sec = 0;
    this.gameLoop = setInterval(() => {
      if (
        !this.state.plant.alive ||
        this.state.plant.growth_stage === this.state.plant.breed.max_growth
      ) {
        alert("the this.props has finished!");
        clearInterval(this.gameLoop);
        this.setState({ status: "finished" });
      }
      if (sec % this.props.water_drop_speed === 0) {
        this.changeWaterLevel(id, -1);
      }
      this.shouldGrow(sec, id);
      this.isThirsty(id);
      sec += 1;
    }, this.props.game_speed);
  }

  shouldGrow(sec, id) {
    if (
      sec % this.props.growth_speed === 0 &&
      this.state.plant.water_level >= this.props.growth_limit
    ) {
      const growth = this.state.plant.growth_stage + 1;
      this.grow(id, growth);
    }
  }

  async isThirsty(id) {
    if (this.water_level === 0) {
      const params = {
        plant: {
          alive: false,
        },
      };
      await plants
        .update(id, params)
        .then(() => {
          this.setState({ plant: { ...this.state.plant, alive: false } });
          this.setState({ status: "dead" });
        })
        .catch((e) => console.log(e));
    }
  }

  async grow(id, growth) {
    const params = {
      plant: {
        growth_stage: growth,
      },
    };
    await plants
      .update(id, params)
      .then(() => {
        this.setState({ plant: { ...this.state.plant, growth_stage: growth } });
      })
      .catch((e) => console.log(e));
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

  // Event methods

  handleWaterClick(event) {
    this.props.changeWaterLevel(this.state.plant.id, 5);
  }

  render() {
    const {
      id,
      alive,
      name,
      water_level,
      growth_stage,
      created_at,
    } = this.state.plant;
    if (this.state.loading) {
      console.log("loading!");
      return <h3>loading!</h3>;
    } else {
      const { spritesheet, max_growth } = this.state.plant.breed;
      const breed_name = this.state.plant.breed.name;
      console.log(breed_name);
      const { finished, status } = this.state;
      return (
        <>
          {finished && <h1>This plant is finished!</h1>}
          <Card style={{ marginTop: 10 }}>
            <CanvasWindow
              width={200}
              height={192}
              maxFrame={max_growth}
              frame={growth_stage}
              sprite={spritesheet}
            />
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
            <Button
              onClick={(e) => {
                this.props.handleDeleteClick(e, id);
              }}
            >
              Delete
            </Button>
            <button
              onClick={(e) => {
                this.handleWaterClick(e);
              }}
            >
              Water
            </button>
          </Card>
          <div></div>
        </>
      );
    }
  }
}
