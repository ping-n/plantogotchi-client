import React from "react";

class CanvasWindow extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.setContext();
    this.loadSprite();
    this.drawSprite();
  }

  componentDidUpdate() {
    this.setContext();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.loadSprite();
    this.drawSprite();
  }

  setContext = () => {
    this.canvas = this.canvasRef.current;
    this.context = this.canvas.getContext("2d");
  };

  loadSprite() {
    this.spriteSheet = this.props.spritesheet;
    this.maxFrame = this.props.maxFrame;
    this.spriteWidth = this.spriteSheet.width / this.maxFrame;
    this.spriteHeight = this.spriteSheet.height;
    this.currentFrame = this.props.frame - 1;
    this.sourceX = this.currentFrame * this.spriteWidth;
  }

  drawSprite = () => {
    this.context.drawImage(
      this.spriteSheet,
      this.sourceX,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  };

  render() {
    return (
      <canvas
        className="modal-canvas"
        ref={this.canvasRef}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}

export default CanvasWindow;
