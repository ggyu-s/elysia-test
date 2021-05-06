import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Main from "../pages";
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
const TextWrapper = styled.div`
  font-size: 50px;
  color: white;
  font-weight: 700;
  margin-bottom: 50px;
`;

function Routes() {
  return (
    <Wrapper>
      <img
        src={ely}
        alt={ely}
        style={{ width: "300px", marginBottom: "10px" }}
      />
      <TextWrapper>Coding Test</TextWrapper>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profileupdate" component={ProfileUpdate} />
      </Switch>
    </Wrapper>
  );
}

export default Routes;
