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

function Routes() {
  return (
    <Wrapper>
      <img
        src={ely}
        alt={ely}
        style={{ width: "300px", marginBottom: "10px" }}
      />
      <div
        style={{
          fontSize: "50px",
          color: "white",
          fontWeight: "700",
          marginBottom: "50px",
        }}
      >
        Coding Test
      </div>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profileupdate" component={ProfileUpdate} />
      </Switch>
    </Wrapper>
  );
}

export default Routes;
