import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './login-view.scss';

export function LoginView(props) {
    const [ username, setUsername] = useState('');
    const [ password, setPassword] = useState('');

    const handleSubmit = (err) => {
        err.preventDefault();
        console.log(username,  password);
        // Send request to log in
        // api.login(user,pass)

        // pass values back
        props.onLoggedIn(username);
    }

    return (
        <Row className="justify-content-md-center mt-5">
            <Col md={4} className="justify-content-md-center mt-5">
                <Form>
                    <Form.Group controlId="form-username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" onChange={event => setUsername(event.target.value)} />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="form-password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={event => setPassword(event.target.value)} />
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit" onClick={handleSubmit}>Login</Button>
                </Form>
                <br />
                <Button variant="secondary" type="button" onClick={() => props.showRegistration(true)}>Register as a new user</Button>
            </Col>
        </Row>
    )
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func,
    showRegistration: PropTypes.func,
}
