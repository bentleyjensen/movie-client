import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
        <div>
            <form>
                <label>
                    Username:
                    <input type="text" value={username} onChange={event => setUsername(event.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
                </label>
                <br />
                <button type="submit" onClick={handleSubmit}>Log In</button>
            </form>
            <br />
            <button type="button" onClick={() => props.showRegistration(true)}>Register as a new user</button>
        </div>
    )
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func,
    showRegistration: PropTypes.func,
}
