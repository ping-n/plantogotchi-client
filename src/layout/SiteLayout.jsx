import React, { Component } from "react";

class SiteLayout extends Component {
  render() {
    return <div className="container">{this.props.children}</div>;
  }
}

export default SiteLayout;
