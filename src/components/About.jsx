import React from "react";
import { Header, Container, Grid, Image } from "semantic-ui-react";
import image from "../assets/about.jpg";

const About = () => {
  return (
    <div className="about-wrapper">
      <Container>
        <Header
          as="h1"
          color="black"
          className="about-header"
          style={{ fontSize: "4em" }}
          textAlign="center"
        >
          ABOUT US
        </Header>
        <Grid stackable>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Image src={image} size="big" fluid/>
            </Grid.Column>
            <Grid.Column>
              <Container textAlign="left" className="about-content">
                <div className="about-text" style={{ fontSize: "1.5em" }}>
                  <p>
                    Plantgotchi will be a React wep app which allow users to
                    register, grow and take care plants online in simulate
                    environment. We got took inspiration Tamagotchi, pretty
                    obvious but we want to expand and do something regarding our
                    hobbies. With covid going around, it is difficult for people
                    being stuck at home and have alot of leisure time.
                  </p>
                  <p>
                    We want to create a game where it would allow user to play
                    regardless of their location or time commitment, the
                    requirement is access to the internet and creating account
                    through the web application.
                  </p>
                </div>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};

export default About;
