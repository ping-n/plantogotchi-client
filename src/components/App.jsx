import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import NoMatch from "./NoMatch";
import Test from "./Test"

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/test" component={Test} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route component={NoMatch} /> 
      </Switch>
    </>
  );
};

export default App;
