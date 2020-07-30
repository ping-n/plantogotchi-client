import React from "react";
import {
  Message,
  Popup,
  Icon,
  Progress,
  Button,
  Modal,
} from "semantic-ui-react";
import CanvasWindow from "./CanvasWindow";
import Pot from "../../assets/pot.png";

export default class PlantModal extends React.Component {
  // Event handling
  handleWaterClick(event, id) {
    let water_amount = 0;
    if (this.props.plant.water_level + 5 > 100) {
      water_amount = 100;
    } else {
      water_amount = this.props.plant.water_level + 5;
    }
    this.props.changeWaterLevel(id, water_amount);
    if (water_amount > this.props.growth_limit) {
      this.props.makeHealthy();
    }
  }

  render() {
    const { props } = this;
    const { id, water_level } = this.props.plant;
    const growthBar = (this.props.frame / this.props.maxFrame) * 100;
    let waterButton = (
      <Button
        color="blue"
        className="water-button"
        onClick={(e) => {
          this.handleWaterClick(e, id);
        }}
      >
        Water
      </Button>
    );
    if (this.props.status === "Finished" || this.props.status === "Dead") {
      waterButton = (
        <Popup
          style={{ fontFamily: "rainyhearts" }}
          trigger={
            <Button color="blue" className="water-button">
              Water
            </Button>
          }
          content="No need to water this plant."
          basic
        />
      );
    }
    return (
      <Modal
        trigger={
          <Button>
            <Icon name="eye" size="large"></Icon>
          </Button>
        }
      >
        <Modal.Header style={{ fontFamily: "DigitalDisco-Thin" }}>
          {props.plant.name}
        </Modal.Header>
        <div className="modal-wrapper">
          <div className="modal-canvas-outer-wrapper">
            <div className="modal-canvas-inner-wrapper">
              <CanvasWindow
                width={"200px"}
                height={"200px"}
                maxFrame={props.maxFrame}
                frame={props.frame}
                spritesheet={props.spritesheet}
              />
              <img className="pot" src={Pot} alt="Plant's pot"></img>
            </div>
          </div>
          <div className="hud-div">
            <div className="progress-outer-div">
              <div className="progress-div">
                <Progress
                  className=".modal-progress"
                  percent={growthBar}
                  color="green"
                />
                <h3
                  className="progress-header"
                  style={{ fontFamily: "rainyhearts" }}
                >
                  Growth Progress
                </h3>
                <Progress
                  className=".modal-progress"
                  percent={water_level}
                  color="blue"
                />
                <h3
                  className="progress-header"
                  style={{ fontFamily: "rainyhearts" }}
                >
                  Water Level
                </h3>
              </div>
            </div>
            <div className="modal-buttons">
              {waterButton}
              <Popup
                style={{ fontFamily: "rainyhearts" }}
                trigger={<Button color="orange">Info</Button>}
                content="When your plant's water level drops below 50% it will stop growing. You can water your plant by clicking the Water droplet."
                basic
              />
              <Message
                style={{ fontFamily: "DigitalDisco-Thin" }}
                className={this.props.messageType}
              >
                {this.props.status}
              </Message>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
