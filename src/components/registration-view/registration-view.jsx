import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Navbar } from '../navbar/navbar';

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
    const [emailMessage, setEmailMessage] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [birthdateMessage, setBirthdateMessage] = useState('');
    const [submitError, setSubmitError] = useState('');

    const checkUsernameLength = (username) => {
        if (username.length < 8 || !username) {
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
        errMessage =(<div>
            {!hasLower && <p>Missing lowercase letter</p>}
            {!hasUpper && <p>Missing uppercase letter</p>}
            {!hasNum && <p>Missing a number</p>}
            {!hasSym && <p>Missing a symbol</p>}
            {!isLong && <p>The password must have 8 characters or more</p>}
        </div>);

        setStrongPasswordMessage(errMessage);

        return !errMessage;
    }

    const checkPasswordMatch = (password) => {
        password = password || password2;
        // Arg is pass2, compare to pass1
        if (password1 !== password || !password1 || !password2) {
            setPasswordMatchMessage('Passwords do not match');
            return false;
        } else {
            // Eventually this will run and need to clear the message once they match
            setPasswordMatchMessage('');
            return true;
        }
    }

    const checkEmail = (input) => {
        input = input || email;

        // Any letter, number, underscore, dot or plus 1+ times
        // An @
        // Any letter, number, or dot 1+ times
        // A single dot and 1+ letters
        const emailRegex = /[a-zA-Z0-9_\.\+]+@[a-zA-Z0-9\.]+\.[a-zA-Z]+/;

        if (input.match(emailRegex)) {
            setEmailMessage('');
            return true;
        }
        console
        setEmailMessage('This email does not appear valid');
        return false;
    }

    const checkBirthdate = (bDate) => {
        bDate = bDate || birthdate;

        // In format yyyy-mm-dd
        // Either 19 or 20
        // Two of any digit (to finish the year)
        // A dash
        // 10, 11, 12 -OR- 0 and a digit 1-9 (no 00 months)
        // A dash
        // 30, 31, OR 0 and a digit 1-9 (no 00 day) OR xs1,2 and a digit
        const dateRegex = /(19|20)\d\d\-(1[012]|0[1-9])\-(30|31|0[1-9]|[12]\d)/;
        if (bDate.match(dateRegex)) {
            setBirthdateMessage('');
            return true;
        }
        setBirthdateMessage('Please enter a date in YYYY-MM-DD format');
        return false;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username, password1, email, birthdate);

        // the if statement short circuits, so run all of these here
        checkPasswordMatch(password2);
        checkStrongPassword(password1);
        checkUsernameLength(username);
        checkEmail(email);
        checkBirthdate(birthdate);

        if (!checkPasswordMatch(password2)
            || !checkStrongPassword(password1)
            || !checkUsernameLength(username)
            || !checkEmail(email)
            || !checkBirthdate(birthdate)) {
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
    <>
        <Row>
            <Col md={12}>
                <Navbar md={12} />
            </Col>
        </Row>
        <Row className="registration-container justify-content-md-center mt-5">
            <Col className="mx-auto mt-5" md={4}>
                <Form>
                    <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" value={username} onChange={event => { setUsername(event.target.value); checkUsernameLength(event.target.value) }}/>
                        {usernameMessage && <Form.Text id="username-error" className="text-danger">{usernameMessage}</Form.Text>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={password1} onChange={event => { setPassword1(event.target.value); checkStrongPassword(event.target.value); }} />
                        {strongPasswordMessage && <Form.Text id="password1-error" className="text-danger">{strongPasswordMessage}</Form.Text>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control type="password" value={password2} onChange={event => { setPassword2(event.target.value); checkPasswordMatch(event.target.value) }} />
                        {passwordMatchMessage && <Form.Text id="password2-error" className="text-danger">{passwordMatchMessage}</Form.Text>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email Address:</Form.Label>
                        <Form.Control type="text" value={email} onChange={event => { console.log(event);setEmail(event.target.value); checkEmail(event.target.value)}} />
                        {emailMessage && <Form.Text id="email-error" className="text-danger">{emailMessage}</Form.Text>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Birthdate (yyyy-mm-dd):</Form.Label>
                        <Form.Control type="text" value={birthdate} onChange={event => { setBirthdate(event.target.value); checkBirthdate(event.target.value)}} />
                        {birthdateMessage && <Form.Text id="birthdate-error" className="text-danger">{birthdateMessage}</Form.Text>}
                    </Form.Group>
                    <Button type="submit" className="mt-3" onClick={handleSubmit}>Submit</Button>
                    <Button type="button" variant="secondary" className="mt-3 mx-3" onClick={() => props.onBackClick(false)}>Back</Button>
                    <Form.Text id="submit-error" className="text-danger">{submitError}</Form.Text>
                </Form>
            </Col>
        </Row>
    </>)
}

RegistrationView.propTypes = {
    onRegistered: PropTypes.func,
}
