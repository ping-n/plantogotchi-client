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
    const response = await Auth.isAuthenticated();

    if (response[1]) {
      this.setState({
        admin: true,
      });
    }
    if (response[0]) {
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
    const { loading, auth, admin } = this.state;
    const route = this.props.location.pathname;
    console.log(admin);
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
    } else if (!loading && route.includes("breed") && !admin) {
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
