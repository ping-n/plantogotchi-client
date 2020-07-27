import React from "react";
import { Progress, Button, Header, Image, Modal } from "semantic-ui-react";
import CanvasWindow from "./CanvasWindow";

const PlantModal = () => (
  <Modal trigger={<Button>Show Modal</Button>}>
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content image>
      {/* <CanvasWindow
        width={200}
        height={200}
        maxFrame={props.plant.breed.max_growth}
        frame={growth_stage}
        spritesheet={this.spritesheet}
      /> */}
      <Modal.Description>
        {/* <Header>{props.plant.name}</Header> */}
        <p>some content here</p>
      </Modal.Description>
      Water Level
      <Progress percent={85} color="blue" />
      Plant Growth
      <Progress percent={83} color="green" />
    </Modal.Content>
    <Modal trigger={<Button>Show Modal</Button>}>
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content image>
        <Image
          wrapped
          size="medium"
          src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
        />
        <Modal.Description>
          <Header>Default Profile Image</Header>
          <p>
            We've found the following gravatar image associated with your e-mail
            address.
          </p>
          <p>Is it okay to use this photo?</p>
        </Modal.Description>
        Water Level
        <Progress percent={85} color="blue" />
        Plant Growth
        <Progress percent={83} color="green" />
      </Modal.Content>
    </Modal>
  </Modal>
);

export default PlantModal;
