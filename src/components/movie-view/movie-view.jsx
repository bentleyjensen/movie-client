import React from 'react';

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
