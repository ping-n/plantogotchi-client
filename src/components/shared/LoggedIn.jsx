import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Auth from "../auth/Auth";

class LoggedIn extends React.Component {
  async componentDidMount() {
    const admin = await Auth.isAdmin();
    if (admin) this.setState({ admin: true });
  }

  handleLogOut = (props) => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    props.history.push("/");
    alert("You have logged out successfully.");
    return <Redirect to="/" />;
  };

  render() {
    return (
      <div className="nav">
        <div className="nav-home">
          <Link to="/">Home</Link>
        </div>
        <div className="nav-controls">
          <Link data-testid="myaccount" to="/myaccount">
            My Account
          </Link>
          <Link data-testid="plants" to="/plants">
            Plants
          </Link>
          <Link data-testid="createplant" to="/createplant">
            Create Plant
          </Link>
          {this.state?.admin && (
            <>
              <Link data-testid="createbreed" to="/createbreed">
                Create Breed
              </Link>
              <Link data-testid="breeds" to="/breeds">
                Breeds
              </Link>
            </>
          )}
          <Button
            color="google plus"
            data-testid="logout"
            onClick={() => this.handleLogOut(this.props)}
          >
            Log Out
          </Button>
        </div>
      </div>
    );
  }
}

export default LoggedIn;
