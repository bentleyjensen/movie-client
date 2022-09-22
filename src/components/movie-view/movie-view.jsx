import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';

import Row from  'react-bootstrap/Row'
import Col from  'react-bootstrap/Col'
import Button from  'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';

import { Link } from 'react-router-dom';

import './movie-view.scss'

function mapStateToProps(state = {}, ownProps = {}) {
    // For some reason, at some point, favorites is a list of IDs and not full objects?
    // not sure how to manage that...
    // Oh, also, the constructor sometimes runs before this function so the prop is undefined. Not helpful.


    if (!Array.isArray(state.user.favorites) || state.user.favorites.length === 0) return {isFavorite: false};

    const favoriteMovie = state.user.favorites.find(m => {
        return m._id === ownProps.movie._id
    });

    return {
        isFavorite: !!favoriteMovie?._id
    }
}

class MovieView extends React.Component {
    constructor(props) {
        super(props);

        // isFavorite is not always defined here
        // console.log(`constructor props isFavorite: ${props.isFavorite}`)
        this.state = {
            favoriteMessage: '',
            isFavorite: props.isFavorite,
        }
    }

    render() {
        const { movie, isFavorite } = this.props;
        const token = localStorage.getItem('token');

        return (
            <Container>
                <Row>
                    <Col md={'auto'}>
                        <h1>
                            <i className='bi bi-chevron-left' onClick={() => window.history.back()} /> {movie.title}
                        </h1>
                    </Col>
                    <Col className='float-right'>
                        {token && <>
                            {/* isFavorite does not auto-update on change, so disable button siwtching for now */}
                            {/* <p>isFavorite (not accurate): {isFavorite? 'true' : 'false'}</p> */}
                            <Button size='md' className='mr-sm-3 float-left' onClick={() => this.addFavorite(movie)}>Add Favorite</Button>
                            <Button size='md' className='float-left' onClick={() => this.removeFavorite(movie)}>Unfavorite</Button>
                            {this.state.favoriteMessage && <p className='text-danger'>{this.state.favoriteMessage}</p>}
                        </>}
                        {!token && <Button>Log in to add favorites</Button>}
                    </Col>
                    <Col className='text-right'>
                        <Button size='md' onClick={() => window.open('/user', '_self')}>Profile</Button>
                    </Col>
                </Row>
                <Row className='movie-view h-100 my-3'>
                    <Col>
                        <h3 className='text-muted my-0'>{movie.year} <Link to={`/genres/${movie.genre.name}`}>{movie.genre.name}</Link></h3>
                        <h3 className='text-muted'>Directed by <Link to={`/directors/${movie.director.name}`}>{movie.director.name}</Link></h3>
                        <h2 className='my-3'>Description</h2>
                        <p className='text-dark'>{movie.description}</p>
                    </Col>

                    <Col className='movie-poster my-3 h-100' md={5}>
                        <img className='float-right mw-100 mh-100' src={`${process.env.API_URL}/images/${movie._id}.jpg`} crossOrigin='anonymous' />
                    </Col>
                </Row>
            </Container>
        );
    }

    addFavorite(movie) {
        this.setState({
            favoriteMessage: 'Adding...'
        });
        axios({
            method: 'post',
            baseURL: process.env.API_URL,
            url: `/user/favorite/${movie._id}`,
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then((res) => {
            this.props.setUser(res.data);
            this.setState({
                favoriteMessage: 'Added successfully',
                isFavorite: true,
            });
        }).catch((err) => {
            console.log(err);
            this.setState({
                favoriteMessage: err.message
            });
        });
    }

    removeFavorite(movie) {
        this.setState({
            favoriteMessage: 'Removing...'
        })
        axios({
            method: 'delete',
            baseURL: process.env.API_URL,
            url: `/user/favorite/${movie._id}`,
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then((res) => {
            this.props.setUser(res.data);
            this.setState({
                favoriteMessage: 'Removed successfully',
                isFavorite: false,
            })
        }).catch((err) => {
            console.log(err);
            this.setState({
                favoriteMessage: err.message
            })
        });
    }
}

export default connect(mapStateToProps, { setUser })(MovieView);

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
    }).isRequired,
    setUSer: PropTypes.func,
}
