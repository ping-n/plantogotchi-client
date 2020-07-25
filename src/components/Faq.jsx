import React, { useState } from "react";
import axios from "axios";
import { Header, Form, Container, Segment, Grid, Message } from "semantic-ui-react";

const Faq = () => {
  //hook for handling formspree
  const [serverState, setServerState] = useState({
    submitting: false,
    status: null,
  });
  //handle the server response from formspree
  const handleServerResponse = (ok, msg, form) => {
    setServerState({
      submitting: false,
      status: { ok, msg },
    });
    if (ok) {
      form.reset();
    }
  };
  // submit request to formspree
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setServerState({ submitting: true });
    axios({
      method: "post",
      url: "https://formspree.io/mnqglgny",
      data: new FormData(form),
    })
      .then((r) => {
        handleServerResponse(true, "Thanks!", form);
      })
      .catch((r) => {
        handleServerResponse(false, r.response.data.error, form);
      });
  };

  return (
    <div className="faw-wrapper">
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Segment>
              <Header as="h1" color="black">
                FAQ
              </Header>
              <Container>
                <p>
                  Q1: WHAT IS PLANTOGOTCHI? <br /> Plantogotchi is inspired by
                  tamagotchi with a twist. Created for those who like plants,
                </p>
                <p>
                  Q2: HOW TO PLAY? <br /> It is really to play, all you have to
                  do is sign up and create a new plant. The gameplay involves
                  looking after your plants via watering and adding fetilizer.
                </p>
                <p>
                  Q3: HOW CAN WE CONTACT YOU? <br /> Contacting us is really
                  simple, all you have to do is fill out the form on the left
                  and click submit. We will try our best to response as soon as
                  possible.
                </p>
              </Container>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Container>
              <Form onSubmit={handleOnSubmit}>
                <Segment>
                  <Form.Input
                    fluid
                    label="Name"
                    name="name"
                    data-testid="name"
                    placeholder="Name"
                  />
                  <Form.Input
                    fluid
                    label="Email"
                    name="name"
                    data-testid="email"
                    placeholder="Email"
                  />
                  <Form.TextArea
                    label="Message"
                    name="message"
                    data-testid="message"
                    placeholder="Leave your message or question here..."
                  />
                  <Form.Button
                    disabled={serverState.submitting}
                    color="twitter"
                  >
                    Submit
                  </Form.Button>
                </Segment>
                {serverState.status && (
                  <Message positive className={!serverState.status.ok ? "errorMsg" : ""}>
                    {serverState.status.msg}
                  </Message>
                )}
              </Form>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Faq;
