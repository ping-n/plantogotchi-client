import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import SignUp from "./SignUp";
import NoMatch from "./NoMatch";
import Test from "./Test"
import Admin from "./Admin"
import ProtectedRoute from "./ProtectedRoute"
import NavBar from "./shared/NavBar";

const App = () => {
  return (
    <>
      <Route component={NavBar}/>
      <Switch>
        <ProtectedRoute exact path="/test" component={Test} />
        <ProtectedRoute exact path="/admin" component={Admin} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/" component={Home} />
        <Route path="*" component={NoMatch} /> 
      </Switch>
    </>
  );
};

export default App;
