import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Navbar } from '../navbar/navbar';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
        <>
            <Row>
                <Col md={12}>
                    <Navbar md={12} />
                </Col>
            </Row>
            <Row className="justify-content-md-center mt-5">
                <Col md={4} className="justify-content-md-center mt-5">
                    <Form>
                        <Form.Group controlId="form-username">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text" onChange={event => setUsername(event.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="form-password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" onChange={event => setPassword(event.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="my-3" onClick={handleSubmit}>Login</Button>
                        <Form.Text className="text-danger">{loginError}</Form.Text>
                    </Form>
                    <br />
                    <Button variant="secondary" type="button" onClick={() => props.showRegistration(true)}>Register as a new user</Button>
                </Col>
            </Row>
        </>
    )
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func,
    showRegistration: PropTypes.func,
}
