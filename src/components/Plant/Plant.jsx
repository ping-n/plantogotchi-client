import React from "react";
import { Card, Button } from "semantic-ui-react";
import CanvasWindow from "./CanvasWindow";

export default class Plant extends React.Component {
  state = { plant: this.props.plant, loading: true, finished: false };

  componentDidMount() {
    this.loadImage();
    if (!this.props.plant.alive) {
      this.setState({ status: "Dead" });
      this.setState({
        statusMessage: "Sorry for your loss...please create a new plant.",
      });
    } else if (
      this.props.plant.growth_stage !== this.props.plant.breed.max_growth
    ) {
      this.setState({ status: "Alive & healthy" });
      this.calculateDifference();
      this.startGame();
    } else {
      this.setState({ status: "Finished" });
      this.setState({ finished: true });
      this.setState({
        statusMessage: "Your plant is finished! Please create a new plant",
      });
    }
  }

  componentDidUpdate() {
    if (this.gameLoop) clearInterval(this.gameLoop);
    if (this.state.status !== "Dead" && this.state.status !== "Finished") {
      this.startGame();
    }
  }

  componentWillUnmount() {
    clearInterval(this.gameLoop);
  }

  loadImage() {
    this.spritesheet = new Image();
    this.spritesheet.src = this.props.plant.breed.spritesheet;
    this.spritesheet.onload = () => {
      this.setState({ loading: false });
    };
  }
  // Intitial calculations

  calculateDifference() {
    const id = this.props.plant.id;
    const updatedTime = new Date(this.props.plant.updated_at);
    const nowTime = new Date(Date.now());
    const difference = nowTime - updatedTime;
    const originalWaterLevel = this.props.plant.water_level;
    const newWaterLevel = this.calculateWaterDrop(id, difference);
    this.calculateGrowth(id, originalWaterLevel, newWaterLevel, difference);
  }

  calculateWaterDrop(id, difference) {
    const water_drop = Math.round(
      difference / (this.props.water_drop_speed * this.props.game_speed)
    );
    let newAmount = 0;
    if (water_drop > this.props.plant.water_level) {
      this.props.changeWaterLevel(id, 0);
    } else {
      newAmount = this.props.plant.water_level - Math.abs(water_drop);
      this.props.changeWaterLevel(id, newAmount);
    }
    return newAmount;
  }

  calculateGrowth(id, originalWaterLevel, newWaterLevel, difference) {
    const {
      game_speed,
      growth_speed,
      water_drop_speed,
      growth_limit,
    } = this.props;
    const { max_growth } = this.props.plant.breed;
    let growth = 0;
    if (newWaterLevel >= growth_limit) {
      growth = difference / (this.props.growth_speed * game_speed);
    } else {
      const timeSpentGrowing =
        (originalWaterLevel - growth_limit) * (water_drop_speed * game_speed);
      growth = timeSpentGrowing / (growth_speed * game_speed);
    }
    growth = growth > max_growth ? max_growth : Math.ceil(growth);
    console.log(growth);
    this.props.grow(id, growth);
  }

  // Main game logic

  startGame() {
    const { id, growth_stage, water_level } = this.props.plant;
    const { max_growth } = this.props.plant.breed;
    const { water_drop_speed, game_speed } = this.props;
    let sec = 0;
    this.gameLoop = setInterval(() => {
      if (growth_stage === max_growth) {
        this.setState({
          statusMessage: "Your plant is finished! Please create a new plant",
        });
        this.setState({ status: "Finished" });
        clearInterval(this.gameLoop);
      } else if (this.props.plant.water_level === 0) {
        this.props.killPlant(id);
        this.setState({
          statusMessage: "Your plant is dead! Please create a new plant",
        });
        this.setState({ status: "Dead" });
        clearInterval(this.gameLoop);
      } else {
        if (sec % water_drop_speed === 0) {
          const waterDropAmount = water_level - 1;
          this.props.changeWaterLevel(id, waterDropAmount);
        }
        this.shouldGrow(sec, id);
        sec += 1;
      }
    }, game_speed);
  }

  shouldGrow(sec, id) {
    if (
      sec % this.props.growth_speed === 0 &&
      this.props.plant.water_level >= this.props.growth_limit
    ) {
      const growth = this.props.plant.growth_stage + 1;
      this.props.grow(id, growth);
    } else {
      this.setState({ status: "Underwatered" });
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
    const birth = new Date(created_at);

    if (this.state.loading) {
      return <h3>loading!</h3>;
    } else {
      const { max_growth, spritesheet } = this.state.plant.breed;
      const breed_name = this.state.plant.breed.name;
      const { statusMessage, status, finished } = this.state;
      return (
        <>
          {statusMessage && <h3>{statusMessage}</h3>}
          <Card style={{ marginTop: 10 }}>
            <CanvasWindow
              width={200}
              height={200}
              maxFrame={max_growth}
              frame={growth_stage}
              spritesheet={this.spritesheet}
            />
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Meta>
                <span className="date">
                  {name} was born on {birth.toDateString()} at{" "}
                  {birth.toTimeString()}
                </span>
              </Card.Meta>
              <Card.Description>
                <h5>Breed: {breed_name}</h5>
                <h5>Water level: {water_level}</h5>
                <h5>Growth Level: {growth_stage}</h5>
                <h5>{status}!</h5>
              </Card.Description>
            </Card.Content>
            <Button
              onClick={(e) => {
                this.props.handleDeleteClick(e, id);
              }}
            >
              Delete
            </Button>
            {alive && !finished && (
              <button
                onClick={(e) => {
                  this.handleWaterClick(e);
                }}
              >
                Water
              </button>
            )}
          </Card>
          <div></div>
        </>
      );
    }
  }
}
