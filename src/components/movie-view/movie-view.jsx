import React from 'react';
import PropTypes from 'prop-types';

import { Navbar } from '../navbar/navbar';

import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import Button from  'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';

import { Link } from 'react-router-dom';

import './movie-view.scss'

export class MovieView extends React.Component {
    render() {
        const { movie, onBackClick, onAddFavorite, onRemoveFavorite } = this.props;
        let { isFavorite } = this.props;
        const imgPath = movie.ImgPath || "";
        const token = localStorage.getItem('token');

        function addFav(event) {
            console.log(`adding favorite`)
            onAddFavorite(movie);
            isFavorite = true;
        }
        
        function removeFav(event) {
            console.log(`removing favorite`)
            onRemoveFavorite(movie);
            isFavorite = false;
        }

        return (
            <Container>
                <Row>
                    <Col className="movie-poster my-3" md={3}>
                        <img src={imgPath}/>
                    </Col>
                    <Col>
                        {(token && !isFavorite) && <Button size="md" onClick={addFav}>Add Favorite</Button>}
                        {(token && isFavorite) && <Button size="md" onClick={removeFav}>Unfavorite</Button>}
                        {!token && <></>}
                    </Col>
                    <Col className="text-right">
                        <Button size="md" onClick={ () => onBackClick() }>Back</Button>
                    </Col>
                </Row>
                <Row className="movie-view">
                    <Col md={9}></Col>
                    <Col md={12}>
                        <h1>{movie.title}</h1>
                            <p className="text-muted my-0">{movie.year} <Link to={`/genres/${movie.genre.name}`}>{movie.genre.name}</Link></p>
                            <p className="text-muted">Directed by <Link to={`/directors/${movie.director.name}`}>{movie.director.name}</Link></p>
                        <p className="text-dark">{movie.description}</p>
                    </Col>
                </Row>
            </Container>
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
    onRemoveFavorite: PropTypes.func.isRequired,
    onAddFavorite: PropTypes.func.isRequired,
    isFavorite: PropTypes.bool.isRequired,
}
