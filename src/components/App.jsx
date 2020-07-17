import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import SignUp from "./SignUp";
import NoMatch from "./NoMatch";
import Test from "./Test";
import Admin from "./Admin";
import ProtectedRoute from "./ProtectedRoute";
import NavBar from "./shared/NavBar";
import Footer from "./shared/Footer";
import SiteLayout from "../layout/SiteLayout";
import Plants from "./Plants";
import Plant from "./Plant";

const App = () => {
  return (
    <>
      <Route component={NavBar} />
      <SiteLayout>
        <Switch>
          <ProtectedRoute exact path="/test" component={Test} />
          <ProtectedRoute exact path="/plants" component={Plants} />
          <ProtectedRoute exact path="/plants/:id" component={Plant} />
          <ProtectedRoute exact path="/admin" component={Admin} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/" component={Home} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </SiteLayout>
      <Route component={Footer} />
    </>
  );
};

export default App;
