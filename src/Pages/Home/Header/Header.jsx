import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./Header.css";
import Flushlogo from "src/Assets/images/Logo.png";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <header id="header" className="header fixed-top">
        <Navbar
          collapseOnSelect
          expand="lg"
          className="nav-bar-bg"
          bg="white"
          variant="light"
          sticky="top "
        >
          <Container className="d-flex justify-content-between">
            <Link to="/feed">
              <Navbar.Brand>
                <img src={Flushlogo} />{" "}
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link className="navLink" href="#features">
                  Features
                </Nav.Link>
                <Nav.Link className="navLink" href="#pricing">
                  Pricing
                </Nav.Link>
              </Nav>
              <Nav>
                <Link to="/login">
                  <button className="wobtn btn px-2 me-2">Login</button>
                </Link>
                <Link to="/signup">
                  <button className="wbtn btn px-2">Register</button>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
