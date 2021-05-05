import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Main from "../pages";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ProfileUpdate from "../pages/ProfileUpdate";
import Register from "../pages/Register";
import imagee from "../images/image.jpeg";
import ely from "../images/ely.png";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
  background-image: url(${imagee});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  flex-direction: column;
`;

function Routes() {
  return (
    <Wrapper>
      <img src={ely} style={{ width: "300px" }} />
      <div>Codig Test</div>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profileupdate" component={ProfileUpdate} />
      </Switch>
    </Wrapper>
  );
}

export default Routes;
