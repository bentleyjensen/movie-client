import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import 'dotenv/config';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { LogoutView } from '../logout-view/logout-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { UserView } from '../user-view/user-view';
import { Navbar } from '../navbar/navbar';
import { Col, Row } from 'react-bootstrap';

import './main-view.scss';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            user: null,
        }
    }

    render() {
        const { movies, user } = this.state;

        return (
            <Router>
                <Row className="row-fluid">
                    <Col md={12}>
                        <Navbar md={12} loggedIn={!!localStorage.getItem('token')} />
                    </Col>
                </Row>
                <Row className='justify-content-md-center main-view mt-3 mx-1'>
                    <Route exact path="/" render={() => {
                        if (movies.length === 0) { return }
                        else {
                            return movies.map(m => <Col md={4} key={m._id} className="my-3">
                                <MovieCard key={m._id} movie={m} />
                            </Col>)
                        }
                    }} />

                    <Route exact path="/register" render={({history}) => {
                        <RegistrationView
                            onRegistered={() => this.showRegistration(false)}
                            onBackClick={() => history.goBack()}
                        />
                    }} />

                    <Route exact path="/login" render={() => {
                        const token = localStorage.getItem('token')
                        if (token)
                            return <Redirect to="/user" />
                        return <LoginView onLoggedIn={newUser => this.onLoggedIn(newUser)} />
                    }} />

                    <Route exact path="/logout" render={() => {
                        return <LogoutView />
                    }} >
                    </Route>

                    <Route path="/movies/:movieId" render={({match, history}) => {
                        return (
                            <MovieView
                                movie={movies.find(m => m._id === match.params.movieId)}
                                onBackClick={() => history.goBack() }
                            />
                        )
                    }} />

                    <Route path="/genres/:name" render={({match, history}) => {
                        return <GenreView genre={match.params.name} onBackClick={() => history.goBack()} />
                    }} />

                    <Route path="/directors/:name" render={({match, history}) => {
                        <DirectorView director={match.params.name} onBackClick={() => history.goBack()} />
                    }} />
                    

                    <Route path="/user" render={() => {
                        const storageToken = localStorage.getItem('token');
                        
                        // Check localStorage and state
                        if (!storageToken) {
                            return <LoginView onLoggedIn={newUser => this.onLoggedIn(newUser)} />
                        } else {
                            return <UserView />
                        }
                    }} />
                </Row>
            </Router>
        );
    }

    componentDidMount() {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        // if (token !== null) {
        //     this.setState({user: user});
        //     this.getMovies(token);
        // }
        this.getMovies(token);
    }

    onLoggedIn(authData) {
        this.setState({
            user: authData.username,
        });

        console.log("Authdata", authData)

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        this.setState({
            user: null,
            token: null,
        });
        localStorage.setItem('token',null);
        localStorage.setItem('user',null);
    }

    getMovies(token) {
        token = token || localStorage.getItem('token');

        if (!token) return;

        axios.get(`${process.env.API_URL}/movies`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            this.setState({ movies: response.data });
        })
        .catch((err) => {
            console.log(err);
        });
    }
}
