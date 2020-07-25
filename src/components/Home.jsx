import React from "react";
import { Header, Image, Segment, Grid } from "semantic-ui-react";
import image from "../assets/home.jpg";

const Home = (props) => {
  return (
    <div className="home-wrapper">
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Segment>
              <Header as="h1" color="black">
                PLANTOGOTCHI
              </Header>
              <Image src={image} size="big" bordered />

              <p>
                Have you ever wanted to grow your own plants, but you have no
                space, no free cash or no time? Well look no further than
                Plantogotchi, you can now grow a plant at the comfort of your
                own home.
              </p>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <p>
                EXCITING STUFF, I AM SIMPLY ADDICTED!! <br />
                EDDY
              </p>
              <p>
                I’ve alway wanted a plant but couldn’t be bother buying one. Now
                i owned more than 20 different plants online. <br /> HARRISON
              </p>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Home;
