import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

import  './movie-card.scss';

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Card className="justify-content-center">
                <Card.Img style={{ 'minHeight': '150px' }} className="mx-auto" variant="top" src={`${process.env.API_URL}/images/${movie._id}.jpg`} alt={movie.title + ' poster'} />
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Body>{movie.description.slice(0,100)}...</Card.Body>
                    {!this.props.children && <Link to={`/movies/${movie._id}`}>
                        <Button variant="primary">Open</Button>
                    </Link>}
                    {!!this.props.children && <div className="text-right">{this.props.children}</div>}
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
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
};
