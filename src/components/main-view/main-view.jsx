import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [
                {_id: 1, title: 'Inception', description: 'desc1...', imagePath: "..."},
                {_id: 2, title: 'The Avengers', description: 'desc2...', imagePath: "..."},
                {_id: 3, title: 'The Illustionist', description: 'desc3...', imagePath: "..."},
            ],
            selectedMovie: null,
        }
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie,
        })
    }


    render() {
        const { movies, selectedMovie } = this.state;

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

        if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => this.setSelectedMovie(newSelectedMovie)}/>;

        return (
            <div className="main-view">
                {movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => this.setSelectedMovie(movie)}/>)}
            </div>
        );
    }
}
