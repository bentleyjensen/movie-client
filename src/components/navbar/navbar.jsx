import React, { useState } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

export function Navbar(props) {
    return (
        <Navbar expand="lg" bg="dark" variant="dark" md={12}>
            <Navbar.Brand href="/">Movie Client</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/movies">Movies</Nav.Link>
                    <Nav.Link href="/user">Profile</Nav.Link>
                    {props.loggedIn ?
                        <Nav.Link href="/logout">Log Out</Nav.Link>
                        : <Nav.Link href="/login">Log In</Nav.Link>
                    }
                    <NavDropdown title="More" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/">Home</NavDropdown.Item>
                        <NavDropdown.Item href="/movies">Movies</NavDropdown.Item>
                        <NavDropdown.Item href="/user">Profile</NavDropdown.Item>
                        <NavDropdown.Item href="/logout">Log Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
