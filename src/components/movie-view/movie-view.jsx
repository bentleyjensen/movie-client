import React from 'react';
import PropTypes from 'prop-types';
import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import Button from  'react-bootstrap/Button'

import './movie-view.scss'

export class MovieView extends React.Component {
    render() {
        const { movie, onBackClick } = this.props;
        const imgPath = movie.ImgPath || "";

        return (
            <Row className="movie-view">
                <Col md={12}>
                    <Button onClick={ () => onBackClick(null)}>Back</Button>
                </Col>
                <Col className="movie-poster my-3" md={3}>
                    <img src={imgPath}/>
                </Col>
                <Col md={9}></Col>
                <Col md={12}>
                    <h1>{movie.title}</h1>
                    <p className="text-muted my-0">{movie.year} {movie.genre.name}</p>
                    <p className="text-muted">Directed by {movie.director.name}</p>
                    <p className="text-dark">{movie.description}</p>
                </Col>
            </Row>
        );
    }
}

MovieView.propTypes = {
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
        imgPath: PropTypes.string,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
}
