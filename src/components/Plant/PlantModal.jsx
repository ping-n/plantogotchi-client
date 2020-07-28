import React from "react";
import { Popup, Icon, Progress, Button, Modal } from "semantic-ui-react";
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
  }

  render() {
    const { props } = this;
    const { id, water_level } = this.props.plant;
    const growthBar = (this.props.frame / this.props.maxFrame) * 100;
    return (
      <Modal
        trigger={
          <Button>
            <Icon name="eye" size="large"></Icon>
          </Button>
        }
      >
        <Modal.Header>{props.plant.name}</Modal.Header>
        <div className="modal-wrapper">
          <div className="modal-canvas-outer-wrapper">
            <div className="modal-canvas-inner-wrapper">
              <CanvasWindow
                className="modal-canvas"
                width={200}
                height={200}
                maxFrame={props.maxFrame}
                frame={props.frame}
                spritesheet={props.spritesheet}
              />
              <img className="pot" src={Pot}></img>
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
                <h3 className="progress-header">Growth Progress</h3>
                <Progress
                  className=".modal-progress"
                  percent={water_level}
                  color="blue"
                />
                <h3 className="progress-header">Water Level</h3>
              </div>
            </div>
            <div className="modal-buttons">
              <Button
                className="water-button"
                onClick={(e) => {
                  this.handleWaterClick(e, id);
                }}
              >
                <Icon name="tint" size="massive"></Icon>
              </Button>
              <Popup
                trigger={<Icon name="question circle outline" size="massive" />}
                content="When your plant's water level drops below 50% it will stop growing. You can water your plant by clicking the Water droplet."
                basic
              />
              {this.props.status}
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}