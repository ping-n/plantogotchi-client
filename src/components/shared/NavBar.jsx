import React, { Component } from "react";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

export class NavBar extends Component {
  render() {
    return (
      <nav>
        {localStorage.getItem("token") ? (
          <LoggedIn history={this.props.history} />
        ) : (
          <LoggedOut />
        )}
      </nav>
    );
  }
}

export default NavBar;
