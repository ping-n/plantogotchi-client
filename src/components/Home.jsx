import React from "react";
import {
  Container,
  Message,
  Header,
  Image,
  Segment,
  Grid,
} from "semantic-ui-react";
import image from "../assets/home.jpg";

const Home = (props) => {
  return (
    <>
      {props.location.state && (
        <Message negative data-testid="home-error">
          {props.location.state.error}
        </Message>
      )}
      <div className="home-wrapper">
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Container className="home-content">
                <Header as="h1" color="black">
                  PLANTOGOTCHI
                </Header>
                <Image src={image} size="big" bordered />

                <p id="home-main-text">
                  Have you ever wanted to grow your own plants, but you have no
                  space, no free cash or no time? Well look no further than
                  Plantogotchi, you can now grow a plant at the comfort of your
                  own home.
                </p>
              </Container>
            </Grid.Column>
            <Grid.Column>
              <Container textAlign="left" className="home-sidecontent">
                <div className="home-review-wrapper">
                  <div className="home-review">
                    <p>
                      "EXCITING STUFF, I AM SIMPLY ADDICTED!!" <br />
                      EDDY
                    </p>
                  </div>
                  <div className="home-review">
                    <p>
                      "I’ve alway wanted a plant but couldn’t be bother buying
                      one. Now i owned more than 20 different plants online."{" "}
                      <br /> HARRISON
                    </p>
                  </div>
                </div>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
};

export default Home;
