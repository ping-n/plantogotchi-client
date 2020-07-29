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

    const response = await Auth.isAuthenticated();

    if (response[1] && this._isMounted) {
      this.setState({
        admin: true,
      });
    }
    if (response[0] && this._isMounted) {
      this.setState({
        auth: true,
        loading: false,
      });
    } else if (this._isMounted) {
      this.setState({
        loading: false,
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = true;
  }

  render() {
    const { loading, auth, admin } = this.state;
    const route = this.props.location.pathname;
    if (!loading && !auth) {
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
    } else if (route.includes("breed") && !admin) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: {
              error: "Only an Admin can access this page. Shoo.",
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
