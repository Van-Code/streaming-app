import React from "react";
import Navbar from "react-bootstrap/Navbar";
export default function Nav(props) {
  return (
    <Navbar variant="dark">
      <Navbar.Brand>Flcks</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>{props.user && `Welcome: ${props.user.name}`}</Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}
