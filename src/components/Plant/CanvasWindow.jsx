import React from "react";
class CanvasWindow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <canvas width={this.props.width} height={this.props.height} />;
  }
}

export default CanvasWindow;
