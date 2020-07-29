import React from "react";
import { Message, Icon, Card, Button } from "semantic-ui-react";
import CanvasWindow from "./CanvasWindow";
import PlantModal from "./PlantModal";

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

  // Initial calculations

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
    const new_growth_level = this.props.plant.growth_stage + growth;
    this.props.grow(id, new_growth_level);
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
          let waterDropAmount = 0;
          if (water_drop_speed < water_level) {
            waterDropAmount = water_level - water_drop_speed;
          }
          this.props.changeWaterLevel(id, waterDropAmount);
        }
        this.shouldGrow(sec, id);
        sec += 1;
      }
    }, game_speed);
  }

  shouldGrow(sec, id) {
    const { growth_speed, growth_limit } = this.props;
    const { water_level, growth_stage } = this.props.plant;
    if (sec % growth_speed === 0 && water_level >= growth_limit) {
      const growth = growth_stage + growth_speed;
      this.props.grow(id, growth);
    } else {
      this.setState({ status: "Underwatered" });
    }
  }

  // Event methods

  render() {
    const { id, alive, name, growth_stage } = this.state.plant;
    if (this.state.loading) {
      return <h3>loading!</h3>;
    } else {
      const { max_growth } = this.state.plant.breed;
      const { status, finished } = this.state;
      let messageType = "";
      switch (status) {
        case "Underwatered":
          messageType = "warning";
          break;
        case "Dead":
          messageType = "error";
          break;
        default:
          messageType = "success";
      }
      return (
        <>
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
              <Card.Description>
                <Message className={messageType}>{status}</Message>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <PlantModal
                  {...this.props}
                  spritesheet={this.spritesheet}
                  maxFrame={max_growth}
                  frame={growth_stage}
                  alive={alive}
                  finished={finished}
                  status={status}
                  messageType={messageType}
                />
                <Button
                  onClick={(e) => {
                    this.props.handleDeleteClick(e, id);
                  }}
                >
                  <Icon name="delete" size="large"></Icon>
                </Button>
              </div>
            </Card.Content>
          </Card>
          <div></div>
        </>
      );
    }
  }
}
