import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import 'dotenv/config';
import { connect } from 'react-redux';

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { LogoutView } from '../logout-view/logout-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { UserView } from '../user-view/user-view';
import { Navbar } from '../navbar/navbar';
import { Col, Row } from 'react-bootstrap';

import './main-view.scss';

mapStateToProps = state => {
    return {
        movies: state.movies
    }
}

class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            favorites: [],
            user: null,
            username: null,
            email: null,
            birthdate: null,
        }
    }

    render() {
        let { movies } = this.props;
        let { favorites } = this.state;

        return (
            <Router>
                <Row className="row-fluid">
                    <Col md={12}>
                        <Navbar md={12} loggedIn={!!localStorage.getItem('token')} />
                    </Col>
                </Row>
                <Row className='justify-content-md-center main-view mt-3 mx-1'>
                    <Route exact path="/" render={() => {
                        if (movies.length === 0) { return <div></div>}
                        else {
                            return <MoviesList movies={movies} />
                        }
                    }} />

                    <Route exact path="/register" render={({history}) => {
                        const token = localStorage.getItem('token');

                        if (token) {
                            return <Redirect to="/user"/>;
                        }
                        
                        return (
                            <RegistrationView
                                onBackClick={() => history.goBack()}
                            />
                        )
                    }} />

                    <Route exact path="/login" render={() => {
                        const token = localStorage.getItem('token')
                        if (token)
                            return <Redirect to="/user" />
                        return <LoginView onLoggedIn={newUser => this.onLoggedIn(newUser)} />
                    }} />

                    <Route exact path="/logout" render={() => {
                        return <LogoutView />
                    }} >
                    </Route>

                    <Route path="/movies/:movieId" render={({match, history}) => {
                        const locatedMovie = this.state.movies.find(m => {
                            if (m._id === match.params.movieId) {
                                return true;
                            }
                            return false;
                        });

                        const isFavorite = this.state.favorites.filter(m => m._id === match.params.movieId).length > 0;
                        console.log(favorites)
                        console.log('located movie: ',locatedMovie)
                        console.log('movie is favorite:', isFavorite);
                        return (
                            <>
                                {locatedMovie && <MovieView
                                    movie={locatedMovie}
                                    onBackClick={() => history.goBack()}
                                    onRemoveFavorite={movie => this.removeFavorite(movie)}
                                    onAddFavorite={movie => this.addFavorite(movie)}
                                    isFavorite={isFavorite}
                                    favorites={favorites}
                                />}
                                {!locatedMovie && <h2>Loading...</h2>}
                            </>
                        )
                    }} />

                    <Route path="/genres/:name" render={({match, history}) => {
                        return <GenreView
                            genre={match.params.name}
                            movies={movies.filter(m => m.genre.name == match.params.name)}
                            onBackClick={() => history.goBack()}
                        />
                    }} />

                    <Route path="/directors/:name" render={({match, history}) => {
                        return <DirectorView
                            director={match.params.name}
                            movies={movies.filter(m => m.director.name == match.params.name)}
                            onBackClick={() => history.goBack()} />
                    }} />

                    <Route path="/user" render={() => {
                        const storageToken = localStorage.getItem('token');
                        
                        // Check localStorage and state
                        if (!storageToken) {
                            return <LoginView onLoggedIn={newUser => this.onLoggedIn(newUser)} />
                        } else {
                            return <UserView
                                onUserUpdated={user => this.onUserUpdated(user)}
                                getUser={() => this.getUser()}
                                onBackClick={() => history.goBack()}
                                onRemoveFavorite={movie => this.removeFavorite(movie)}/>
                        }
                    }} />
                </Row>
            </Router>
        );
    }

    componentDidMount() {
        this.getMovies();
        this.getUser();
    }

    onLoggedIn(authData) {
        this.setState({
            user: authData.username,
        });

        console.log("Authdata", authData)

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.username);
    }

    getUser() {
        const token = localStorage.getItem('token');

        if(!token) {
            return;
        }

        axios.get(`${process.env.API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => {
            this.setState({
                username: res.data.username,
                email: res.data.email,
                birthdate: res.data.birthdate.split('T')[0],
                favorites: res.data.favorites,
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    onUserUpdated(user) {
        this.setState({
            user: user.username,
            email: user.email,
            birthdate: user.birthdate,
        });
    }

    onLoggedOut() {
        this.setState({
            user: null,
            token: null,
        });
        localStorage.setItem('token',null);
        localStorage.setItem('user',null);
    }

    addFavorite(movie) {
        axios({
            method: 'post',
            baseURL: process.env.API_URL,
            url: `/user/favorite/${movie._id}`,
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            data: 'random string'
        })
        .then((res) => {
            this.setState({
                favorites: res.data.favorites,
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    removeFavorite(movie) {
        axios({
            method: 'delete',
            baseURL: process.env.API_URL,
            url: `/user/favorite/${movie._id}`,
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then((res) => {
            this.setState({
                favorites: res.data.favorites,
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    getMovies() {
        axios.get(`${process.env.API_URL}/movies`,)
        .then((res) => {
            console.log('received movies')
            this.props.setMovies(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

export default connect(mapStateToProps, { setMovies })(MainView);
