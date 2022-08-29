import React from 'react';
import axios from 'axios';
import 'dotenv/config';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Navbar } from '../navbar/navbar';
import { Col, Row } from 'react-bootstrap';

import './main-view.scss';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            register: false,
        }
    }

    render() {
        const { movies, selectedMovie, user, register } = this.state;

        if (!user && !register) return (<LoginView
            onLoggedIn={newUser => this.onLoggedIn(newUser)}
            showRegistration={reg => this.showRegistration(reg)} />
        )

        if (register) return (
        <RegistrationView
            onRegistered={() => this.showRegistration(false)}
            onBackClick={(reg) => this.showRegistration(reg)} />
        )

        if (movies.length === 0) return <Row className='justify-content-md-center main-view mt-5'></Row>;

        if (selectedMovie) return (
            <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => this.setSelectedMovie(newSelectedMovie)} />
        );

        return (<>
            <Row>
                <Col md={12}>
                    <Navbar md={12} />
                </Col>
            </Row>
            <Row className='justify-content-md-center main-view mt-5'>
                {movies.map(movie => <Col md={3} key={movie._id} className="my-3"><MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => this.setSelectedMovie(movie)}/></Col>)}
            </Row>
        </>);
    }

    componentDidMount() {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (token !== null) {
            this.setState({user: user});
            this.getMovies(token);
        }
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie,
        })
    }

    onLoggedIn(authData) {
        this.setState({
            user: authData.username,
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.username);
        this.getMovies(authData.token);
    }

    showRegistration(reg) {
        this.setState({
            register: reg
        })
    }

    getMovies(token) {
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
