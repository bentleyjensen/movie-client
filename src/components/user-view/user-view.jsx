import React from "react";
import axios from "axios";

import { Row, Col } from "react-bootstrap";

export class UserView extends React.Component {
    constructor() {
        super();
    }

    render() {
        const user = localStorage.getItem('user');
        return (
            <Row>
                <Col>
                    {user && <h2> Howdy {user}!</h2>}
                    {!user && <h2>Hello there</h2>}
                </Col>
            </Row>
        )
    }

    componentDidMount() {
        // TODO: get this to work
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
            axios.get(`${process.env.API_URL}/user/${user.toLowerCase()}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((response) => {
                localStorage.setItem("user._id", response.data._id)

                localStorage.setItem("user.username", response.data.username)

                localStorage.setItem("user.email", response.data.email)

                localStorage.setItem("user.birthdate", response.data.birthdate)

                localStorage.setItem("user.favorites", response.data.favorites)
            })
            .catch((err) => {console.log(err)});
        } else {
            console.log('No user');
        }
    }
}
