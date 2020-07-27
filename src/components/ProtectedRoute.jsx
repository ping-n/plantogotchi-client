import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./auth/Auth";

class ProtectedRoute extends React.Component {
  state = {
    auth: false,
    loading: true,
  };

  componentDidMount() {
    if (Auth.isAuthenticated()) {
      this.setState({
        auth: true,
        loading: false,
      });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { loading, auth } = this.state;
    if (!loading && !auth) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: {
              error:
                "We currently cannot connect to server, please try again later.",
            },
          }}
        />
      );
    } else {
      return (
        !loading && (
          <Route
            exact={this.props.exact}
            path={this.props.path}
            component={this.props.component}
          />
        )
      );
    }
  }
}

export default ProtectedRoute;
