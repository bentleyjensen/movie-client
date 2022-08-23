import React from 'react';
import PropTypes from 'prop-types';

import './movie-view.scss'

export class MovieView extends React.Component {
    render() {
        const { movie, onBackClick } = this.props;
        const imgPath = movie.ImgPath || "";
        return (
            <div className="movie-view">
                <button onClick={ () => onBackClick(null)}>Back</button>
                <br />
                <br />
                <div className="movie-poster">
                    <img src={imgPath}/>
                </div>
                <div className="movie-title">
                    <span className="value">{movie.title}</span>
                </div>
                <div className="movie-year-genre">
                    <span className="value">{movie.year} </span>-
                    <span className="value"> {movie.genre.name}</span>
                </div>
                <div className="movie-director">
                    <span className="label">Directed by </span>
                    <span className="value">{movie.director.name}</span>
                </div>
                <br />
                <div className="movie-description">
                    <span className="value">{movie.description}</span>
                </div>
            </div>
        );
    }
}

MovieView.PropTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        }).isRequired,
        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            birthdate: PropTypes.string,
            bio: PropTypes.string,
            movies: PropTypes.array,
        }),
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
}
