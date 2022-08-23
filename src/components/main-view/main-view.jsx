import React from 'react';
import axios from 'axios';
import 'dotenv/config';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

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

        if (!user && !register) return <LoginView onLoggedIn={newUser => this.onLoggedIn(newUser)} showRegistration={reg => this.showRegistration(reg)} />

        if (register) return <RegistrationView onRegistered={() => this.showRegistration(false)} />

        if (movies.length === 0) return <div className="main-view"></div>;

        if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => this.setSelectedMovie(newSelectedMovie)}/>;

        return (
            <div className="main-view">
                {movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => this.setSelectedMovie(movie)}/>)}
            </div>
        );
    }

    componentDidMount() {
        axios.get(process.env.dbHost)
        .then(response => {
            this.setState({
                movies: response.data,
            });
        });
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie,
        })
    }

    onLoggedIn(user) {
        this.setState({
            user
        })
    }

    showRegistration(reg) {
        this.setState({
            register: reg
        })
    }
}
