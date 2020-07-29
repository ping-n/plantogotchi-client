import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./auth/Auth";

class ProtectedRoute extends React.Component {
  _isMounted = false;

  state = {
    admin: false,
    auth: false,
    loading: true,
  };

  async componentDidMount() {
    this._isMounted = true;

    console.log(`admin at start of componentDidMount is ${this.state.admin}`);

    const response = await Auth.isAuthenticated();

    console.log(
      `from response, auth is ${response[0]} and admin is ${response[1]}`
    );
    console.log(`mounted before admin block:${this._isMounted}`);
    if (this.props.admin) {
      if (response[1] & this._isMounted) {
        console.log("entered admin block");
        this.setState({
          admin: true,
        });
      }
    }
    console.log(`mounted before auth block:${this._isMounted}`);
    if (response[0] & this._isMounted) {
      console.log("entered auth block");
      this.setState({
        auth: true,
        loading: false,
      });
    } else if (this._isMounted) {
      this.setState({
        loading: false,
      });
    }
    console.log(`admin at end of componentDidMount is ${this.state.admin}`);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { loading, auth } = this.state;
    const { admin } = this;
    if (this.props.admin) {
      if ((!loading && !auth) || !admin) {
        return (
          <Redirect
            to={{
              pathname: "/",
              state: {
                error: "This area is restricted to admins only.",
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
    } else if (!loading && !auth) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: {
              error: "Please log in to access this page.",
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
