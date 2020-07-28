import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import {
  Menu,
  Grid,
  Sidebar,
  Button,
  Checkbox,
  Segment,
} from "semantic-ui-react";

// Mobile Menu, not sure how to implement it yet

const handleLogOut = (props) => {
  localStorage.removeItem("token");
  localStorage.removeItem("auth");
  props.history.push("/");
  alert("You have logged out successfully.");
  return <Redirect to="/" />;
};

const SideBarLoggedIn = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <Grid columns={1}>
      <Grid.Column>
        <Checkbox
          checked={visible}
          label={{ children: <code>visible</code> }}
          onChange={(e, data) => setVisible(data.checked)}
        />
      </Grid.Column>
      <Grid.Column>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="slide out"
            icon="label"
            inverted
            onHide={() => setVisible(false)}
            vertical
            visible={visible}
            width="thin"
          >
            <Menu.Item as={NavLink} to="/myaccount">
              My Account
            </Menu.Item>
            <Menu.Item as={NavLink} to="/plants">
              Plants
            </Menu.Item>
            <Menu.Item as={NavLink} to="/createplant">
              Create Plant
            </Menu.Item>
            <Menu.Item as={Button} onClick={() => handleLogOut(props)}>
              Log Out
            </Menu.Item>
          </Sidebar>
        </Sidebar.Pushable>
      </Grid.Column>
    </Grid>
  );
};

export default SideBarLoggedIn;
