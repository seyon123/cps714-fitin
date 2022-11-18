import React, { useEffect, useState } from "react";
import { Accordion, Button, Container, Tab, Tabs } from "react-bootstrap";
import LoadingSpinner from "../components/LoadingSpinner";
import Footer from "../components/Footer";
import "./HelpPage.css";
import { Link } from "react-router-dom";

function HelpPage() {
  const [isLoading, setIsLoading] = useState(true);

  // Set the page title
  useEffect(() => {
    setIsLoading(true);
    document.title = `Help | FitIn`;
    setIsLoading(false);
  }, []);

  return (
    <LoadingSpinner isLoading={isLoading}>
      <Container fluid className="mainPage px-4 min-vh-100">
        <div>
          <div className="helpbox text-center">
            <div>
              <h1 className="my-5" style={{ fontSize: "60px" }}>
                FAQ
              </h1>
            </div>
          </div>
          <Tabs
            defaultActiveKey="workouts"
            transition={false}
            id="noanim-tab-example"
            className="mb-3 d-flex align-items-center justify-content-center"
          >
            <Tab eventKey="workouts" title="Workout">
              <div className="helpbox">
                <div>
                  <h1 className="pt-4">Help with workouts</h1>
                  <hr></hr>
                  <p>
                    Please look at the following for popular topics regarding
                    workouts page
                  </p>
                </div>
              </div>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="h1">
                    How do I use the step counter?
                  </Accordion.Header>
                  <Accordion.Body>
                    The step counter is very helpful in keeping your fitness
                    stuff in track, you can access the step counter by going to
                    the workout page. The step counter is located at right below
                    the calendar on the left side of the screen. You can
                    increment the step counter by 10s or by entering a custom
                    amount on the text field. The database stores your steps by
                    date so you can look back through the months and keep track
                    of your progress of how many steps you've walked every day!
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    I'm new to working out and want to know more about workouts
                    where do I look?
                  </Accordion.Header>
                  <Accordion.Body>
                    FitIn has provided a very helpful tool with the explore
                    workouts section located at the bottom of the Workouts page.
                    This section has a comprehensive list of all the workouts
                    you can keep track of using FitIn's workout tracking
                    technology. To see more info on any of the workouts listed
                    in the carousel, you can click on the card which will show
                    pop-up a modal which will detail all the information
                    regarding that specific workout. Including instructions on
                    how to do the workout as well as visual models to help users
                    through the workout.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    How do I make a custom workout?
                  </Accordion.Header>
                  <Accordion.Body>
                    FitIn has its custom technology in place to help its users
                    make their own custom workout routines. To build your own
                    custom routine, locate the my routines container. There
                    should be a button labeled "Create Routine" which opens a
                    modal where you can specify routine name and which workouts
                    you wish to add to that routine. In addition, you can also
                    specify the sets and reps you wish to do. After filling in
                    all the information on the modal, click Save to save that
                    workout. You can then add that routine to any day you wish
                    by clicking the Select Routine button located on the middle
                    of the screen. To change dates click on a different date on
                    the calendar.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Tab>
            <Tab eventKey="social" title="Social">
              <div className="helpbox">
                <div>
                  <h1 className="pt-4">Help with socials</h1>
                  <hr></hr>
                  <p>
                    Please look at the following for popular topics regarding
                    socials page
                  </p>
                </div>
              </div>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="h1">
                    How do I post on the socials page?
                  </Accordion.Header>
                  <Accordion.Body>
                    Posting on the socials page is quite easy, simply create a
                    post using the associated widget. You can add a picture and
                    tags for easier searchability. Once you are done creating
                    your post, simply click on the arrow key in the bottom right
                    corner of the create a post widget to publish your post.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    How do I reply to other peoples posts and like them?
                  </Accordion.Header>
                  <Accordion.Body>
                    Simply locate the post you wish to send a reply to, enter
                    your reply in the text box located under the post and press
                    the blue reply button. To like a post, click on the empty
                    heart symbol right underneath the post content. Clicking the
                    like again will subsequently unlike the post.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    How do I go to a singular post page?
                  </Accordion.Header>
                  <Accordion.Body>
                    To go to the individual post page, simply click on either
                    the text or image associated with a post to be brought to
                    that posts page. Once on this page, you can view the image
                    in better quality and clarity.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Tab>
          </Tabs>
          <div className="d-flex flex-column text-center align-items-center pb-4">
            <h1 className="my-5"> Didn't find what you need?</h1>
            <Button
              as={Link}
              to="#"
              onClick={(e) => {
                window.location.href = "mailto:fitin@fitin.web.app";
                e.preventDefault();
              }}
              variant="primary"
              size="lg"
            >
              <h3>Email Us</h3>
            </Button>
          </div>
        </div>
        <div className="helpPageFooter">
          <Footer />
        </div>
      </Container>
    </LoadingSpinner>
  );
}
export default HelpPage;
