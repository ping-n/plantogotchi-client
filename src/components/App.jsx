import "rsuite/dist/styles/rsuite-default.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./User/Login";
import Home from "./Home";
import SignUp from "./User/SignUp";
import NoMatch from "./NoMatch";
import ProtectedRoute from "./ProtectedRoute";
import NavBar from "./shared/NavBar";
import Footer from "./shared/Footer";
import SiteLayout from "../layout/SiteLayout";
import Plants from "./Plant/Plants";
import Plant from "./Plant/Plant";
import CreatePlant from "./Plant/CreatePlant";
import EditPlant from "./Plant/EditPlant";
import CreateBreed from "./Breed/CreateBreed";
import Breeds from "./Breed/Breeds";
import EditBreed from "./Breed/EditBreed";
import MyAccount from "./User/MyAccount";
import About from "./About";
import Faq from "./Faq";

const App = () => {
  return (
    <>
      <Route component={NavBar} />
      <SiteLayout>
        <Switch>
          <ProtectedRoute exact path="/breeds" component={Breeds} />
          <ProtectedRoute exact path="/breeds/edit/:id" component={EditBreed} />
          <ProtectedRoute exact path="/createbreed" component={CreateBreed} />
          <ProtectedRoute exact path="/plants/edit/:id" component={EditPlant} />
          <ProtectedRoute exact path="/createplant" component={CreatePlant} />
          <ProtectedRoute exact path="/plants" component={Plants} />
          <ProtectedRoute exact path="/plants/:id" component={Plant} />
          <ProtectedRoute exact path="/myaccount" component={MyAccount} />
          <Route exact path="/about" component={About} />
          <Route exact path="/faq" component={Faq} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </SiteLayout>
      <Route component={Footer} />
    </>
  );
};

export default App;
