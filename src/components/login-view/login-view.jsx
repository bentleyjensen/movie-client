import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from 'react-router-dom';

import './login-view.scss';

export function LoginView(props) {
    const [ username, setUsername] = useState('');
    const [ password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const verifyLogin = () => {
        let valid = true;

        if(username.length < 8 || password.length < 8) {
            valid = false;
        }

        return valid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username,  password);

        const isValid = verifyLogin();

        if (!isValid) {
            setLoginError('Invalid username password combination');
            return;
        }

        // Send login
        axios.post(`${process.env.API_URL}/login`, {
            username,
            password
        })
        .then(response => {
            console.log(response.data)
            props.onLoggedIn({
                token: response.data.token,
                username,
            });
        }).catch(err => {
            setLoginError('Invalid username password combination');
        });
    }

    return ( 
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col />
                <Col md={4} className="justify-content-md-center mt-5">
                    <Container fluid>
                        <Form>
                            <Form.Group controlId="form-username">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control type="text" onChange={event => setUsername(event.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="form-password">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" onChange={event => setPassword(event.target.value)} />
                            </Form.Group>
                                <Row>
                                    <Col>
                                        <Button variant="primary" type="submit" className="my-3" onClick={handleSubmit}>Login</Button>
                                    </Col>
                                    <Col className="text-right">
                                        <Link to="/registration">
                                            <Button variant="secondary" type="button" className="text-right my-3">Register</Button>
                                        </Link>
                                    </Col>
                                </Row>
                            
                            <Form.Text className="text-danger">{loginError}</Form.Text>
                        </Form>
                    </Container>
                </Col>
                <Col />
            </Row>
            <Row>
                <Col />
                
                <Col />
            </Row>
        </Container>
    )
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func,
}
