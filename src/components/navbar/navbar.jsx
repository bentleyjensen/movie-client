import React, { useState } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

export function Navbar(props) {
    return (
        <Navbar expand="lg" bg="dark" variant="dark" md={12}>
            <Navbar.Brand href="#home">Movie Client</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#movies">Movies</Nav.Link>
                    <Nav.Link href="#user">Profile</Nav.Link>
                    <Nav.Link href="#user">Log Out</Nav.Link>
                    <NavDropdown title="More" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#home">Home</NavDropdown.Item>
                        <NavDropdown.Item href="#movies">Movies</NavDropdown.Item>
                        <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
                        <NavDropdown.Item href="#Logout">Log Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
