import React from "react";
import { Header, Container, Segment, Grid, Image } from "semantic-ui-react";
import image from "../assets/about.jpg"

const About = () => {
  return (
    <div className="about-wrapper">
      <Container>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Segment>
                <Header as="h1" color="black">
                  ABOUT
                </Header>
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
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Image src={image} size="big"/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};

export default About;
