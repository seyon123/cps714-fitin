import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavLink } from "react-router-dom";

import "./HelpPage.css";
import { Card } from "react-bootstrap";

function HelpPage() {
  // Set the page title
  useEffect(() => {
    document.title = `Help | FitIn`;
  }, []);
  return (
    <Container fluid className="mainPage px-4">
      <Card bg="dark" className="helpbox">
        <Card.Body>
          <h1 className="pt-4">Help!</h1>
          <hr></hr>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}
export default HelpPage;
