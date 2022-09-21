import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

import { setUser } from "../../actions/actions";

function LogoutView(props) {
    localStorage.clear();
    props.setUser({});

    return (<>
        <Container fluid >
            <Row className="justify-content-md-center">
                <Col className="mx-auto" md={4}>
                    <h3 className='text-center'>You have been logged out</h3>
                </Col>
            </Row>
            <Row className="justify-content-md-center" >
                <Col md={1}>
                    <Link to='/'>
                        <Button variant="primary" className="mt-3">Home</Button>
                    </Link>
                </Col>
                <Col md={1}>
                    <Link to='/user'>
                        <Button variant="primary" className="my-3 float-right">Login</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    </>)
}

export default connect(null, { setUser })(LogoutView);

LogoutView.propTypes = {
    setUSer: PropTypes.func,
}
