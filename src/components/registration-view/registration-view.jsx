import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
        <div class="registration-container">
            <form>
                <label>
                    Choose your new username (8+ characters):
                    <br />
                    <input type="text" value={username} onChange={event => { setUsername(event.target.value); checkUsernameLength(event.target.value)}} />
                    <div id="username-error" class="error">{usernameMessage}</div>
                </label>
                <br />
                <br />
                <label>
                    Choose your new password (8+ characters, including an uppercase letter, a lowercase letter,  a number and a symbol)
                    <br />
                    <input type="text" value={password1} onChange={event => { setPassword1(event.target.value); checkStrongPassword(event.target.value);}} />
                    <div id="password1-error" class="error">{strongPasswordMessage}</div>
                </label>
                <br />
                <br />
                <label>
                    Verify your password:
                    <br />
                    <input type="text" value={password2} onChange={event => { setPassword2(event.target.value); checkPasswordMatch(event.target.value)}} />
                    <div id="password2-error" class="error">{passwordMatchMessage}</div>
                </label>
                <br />
                <br />
                <label>
                    Email Address:
                    <br />
                    <input type="text" value={email} onChange={event => setEmail(event.target.value)} />
                </label>
                <br />
                <br />
                <label>
                    Birthdate:
                    <br />
                    <input type="text" value={birthdate} onChange={event => setBirthdate(event.target.value)} />
                </label>
            </form>
            <button type="submit" onClick={handleSubmit}>Submit</button>
            <div id="submit-error" class="error">{submitError}</div>
        </div>
    )
}

RegistrationView.propTypes = {
    onRegistered: PropTypes.func,
}
