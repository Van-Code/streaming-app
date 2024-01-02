import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export default function Nav(props) {
  return (
    <Navbar variant="dark">
      <Container>
        <Navbar.Brand>Flcks</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {props.user && `Welcome: ${props.user.name}`}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
