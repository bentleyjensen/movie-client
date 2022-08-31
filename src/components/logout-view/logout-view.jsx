import React from "react";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

export function LogoutView(props) {
    localStorage.clear();
    return (<>
        <Container fluid >
            <Row className="justify-content-md-center">
                <Col className="mx-auto" md={4}>
                    <h3>You have been logged out</h3>
                </Col>
            </Row>
            <Row className="justify-content-md-center" >
                <Col md={1}>
                    <Link to='/'>
                        <Button variant="primary" className="mt-3">Home</Button>
                    </Link>
                    <Link to='/user'>
                        <Button variant="primary" className="my-3 float-right">Login</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    </>)
}
