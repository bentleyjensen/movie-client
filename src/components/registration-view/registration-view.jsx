import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './registration-view.scss';

export function RegistrationView (props) {
    const [username, setUsername] = useState('');
    const [usernameMessage, setUsernameMessage] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [strongPasswordMessage, setStrongPasswordMessage] = useState('');
    const [passwordMatchMessage, setPasswordMatchMessage] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [submitError, setSubmitError] = useState('');

    const checkUsernameLength = (username) => {
        if (username.length < 8) {
            setUsernameMessage('Username must have at least 8 characters');
            return false;
        } else {
            setUsernameMessage('');
            return true;
        }
    }

    const checkStrongPassword = (password) => {
        password = password || password1;

        const hasLower = password.match(/[a-z]/);
        const hasUpper = password.match(/[A-Z]/);
        const hasNum = password.match(/[0-9]/);
        const hasSym = password.match(/[^a-zA-Z0-9]/);
        const isLong = password.length >= 8;
        errMessage = '';

        if (!hasLower) {
            errMessage += "Missing lowercase letter";
        }
        if (!hasUpper) {
            errMessage += "<br />Missing uppercase letter";
        }
        if (!hasNum) {
            errMessage += "<br />Missing a number";
        }
        if (!hasSym) {
            errMessage += "<br />Missing a symbol";
        }
        if (!isLong) {
            errMessage += "<br />The password must have 8 characters or more";
        }

        setStrongPasswordMessage(errMessage);

        return !errMessage;
    }

    const checkPasswordMatch = (password) => {
        password = password || password2;
        // Arg is pass2, compare to pass1
        if (password1 !== password) {
            setPasswordMatchMessage('Passwords do not match');
            return false;
        } else {
            // Eventually this will run and need to clear the message once they match
            setPasswordMatchMessage('');
            return true;
        }
    }

    const handleSubmit = (err) => {
        err.preventDefault();
        console.log(username, password1, email, birthdate);
        console.log('Strong Pass: ', checkStrongPassword(password1));
        console.log('Match Pass: ', checkPasswordMatch(password2));
        console.log('user len: ', checkUsernameLength(username));

        if (!checkPasswordMatch(password2) || !checkStrongPassword(password1) || !checkUsernameLength(username)) {
            setSubmitError('Cannot submit. Please check for errors above.');
        } else {
            // Send request to create user
            // See if user was created successfully
            // Display errors if necessary

            // pass values back
            props.onRegistered({
                username,
                password1,
                email,
                birthdate
            });
        }
    }

    return (
        <Row className="registration-container">
            <Form>
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" value={username} onChange={event => { setUsername(event.target.value); checkUsernameLength(event.target.value) }}/>
                    <Form.Text id="username-error" className="text-danger">{usernameMessage}</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" value={password1} onChange={event => { setPassword1(event.target.value); checkStrongPassword(event.target.value); }} />
                    <Form.Text id="password1-error" className="text-danger">{strongPasswordMessage}</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control type="password" value={password2} onChange={event => { setPassword2(event.target.value); checkPasswordMatch(event.target.value) }} />
                    <Form.Text id="password2-error" className="text-danger">{passwordMatchMessage}</Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control type="text" value={email} onChange={event => setEmail(event.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Birthdate (yyyy/mm/dd):</Form.Label>
                    <Form.Control type="text" value={birthdate} onChange={event => setBirthdate(event.target.value)} />
                </Form.Group>
                <Button type="submit" className="mt-3" onClick={handleSubmit}>Submit</Button>
                <Form.Text id="submit-error" className="text-danger">{submitError}</Form.Text>
            </Form>
        </Row>
    )
}

RegistrationView.propTypes = {
    onRegistered: PropTypes.func,
}
