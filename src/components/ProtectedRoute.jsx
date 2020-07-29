import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./auth/Auth";

class ProtectedRoute extends React.Component {
  state = {
    admin: false,
    auth: false,
    loading: true,
  };

  async componentDidMount() {
    if (this.props.admin) {
      const admin = await Auth.isAdmin();
      if (admin) this.setState({ admin: true });
    }
    if (await Auth.isAuthenticated()) {
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
