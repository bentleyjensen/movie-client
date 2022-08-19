import React from 'react';
import axios from 'axios';
import 'dotenv/config';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
        }
    }

    render() {
        const { movies, selectedMovie } = this.state;

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
}
