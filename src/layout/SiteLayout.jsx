import React, { Component } from "react";

class SiteLayout extends Component {
  render() {
    return <main className="site-wrapper">{this.props.children}</main>;
  }
}

export default SiteLayout;
