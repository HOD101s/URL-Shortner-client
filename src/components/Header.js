import React from "react";
import { Navbar, Badge } from "react-bootstrap";

export default function Header(props) {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#">URL Shortner</Navbar.Brand>
        <Badge
          onClick={() => {
            window.open("https://www.linkedin.com/in/manas-acharya/");
            window.focus();
          }}
          pill
          variant="dark"
        >
          built by Manas Acharya
        </Badge>
      </Navbar>
    </>
  );
}
