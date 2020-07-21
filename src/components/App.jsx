import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./User/Login";
import Home from "./Home";
import SignUp from "./User/SignUp";
import NoMatch from "./NoMatch";
import Admin from "./User/Admin";
import ProtectedRoute from "./ProtectedRoute";
import NavBar from "./shared/NavBar";
import Footer from "./shared/Footer";
import SiteLayout from "../layout/SiteLayout";
import Plants from "./Plant/Plants";
import Plant from "./Plant/Plant";

const App = () => {
  return (
    <>
      <Route component={NavBar} />
      <SiteLayout>
        <Switch>
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
