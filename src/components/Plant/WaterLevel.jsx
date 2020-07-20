import React from "react";
import { plants } from "../../classes/PlantApi";

export default class WaterLevel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      level: this.props.level,
      seconds: 0,
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds + 1,
      }));
    }, 1000);
  }

  componentDidUpdate() {
    if (this.state.seconds > 10) {
      if (this.state.level > 0) {
        this.setState((prevState) => ({
          level: prevState.level - 10,
          seconds: 0,
        }));
        this.props.updateWaterLevel(this.props.id, this.state.level);
      }
    }
  }

  render() {
    return <h3>Water Level: {this.state.level}</h3>;
  }
}
