import React from "react";
import { Progress, Button, Header, Modal } from "semantic-ui-react";
import CanvasWindow from "./CanvasWindow";

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
      <Modal trigger={<Button>Show Modal</Button>}>
        <Modal.Header>{props.plant.name}</Modal.Header>
        <div className="modal-wrapper">
          <div className="modal-canvas">
            <CanvasWindow
              width={200}
              height={200}
              maxFrame={props.maxFrame}
              frame={props.frame}
              spritesheet={props.spritesheet}
            />
          </div>
          <div>
            <Header>Growth Progress</Header>
            <Progress percent={growthBar} color="green" />
            <Header>Water Level</Header>
            <Progress percent={water_level} color="blue" />
          </div>
          {this.props.alive && !this.props.finished && (
            <button
              onClick={(e) => {
                this.handleWaterClick(e, id);
              }}
            >
              Water
            </button>
          )}
        </div>
      </Modal>
    );
  }
}
