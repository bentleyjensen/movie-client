import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import 'dotenv/config';
import { connect } from 'react-redux';

import { setMovies, setUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import MovieView from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import LogoutView from '../logout-view/logout-view';
import { RegistrationView } from '../registration-view/registration-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import UserView from '../user-view/user-view';
import Navbar from '../navbar/navbar';
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
    }

    render() {
        let { movies } = this.props;

        return (
            <Router>
                <Row className='row-fluid'>
                    <Col md={12}>
                        <Navbar md={12} loggedIn={!!localStorage.getItem('token')} />
                    </Col>
                </Row>
                <Row className='justify-content-md-center main-view mt-3 mx-1'>
                    <Route exact path='/' render={() => {
                        if (movies.length === 0) { return <div></div>}
                        else {
                            return <MoviesList movies={movies} />
                        }
                    }} />

                    <Route exact path='/register' render={({history}) => {
                        const token = localStorage.getItem('token');

                        if (token) {
                            return <Redirect to='/user'/>;
                        }
                        
                        return <RegistrationView />
                    }} />

                    <Route exact path='/login' render={() => {
                        const token = localStorage.getItem('token')
                        if (token)
                            return <Redirect to='/user' />
                        return <LoginView onLoggedIn={newUser => this.onLoggedIn(newUser)} />
                    }} />

                    <Route exact path='/logout' render={() => {
                        return <LogoutView />
                    }} >
                    </Route>

                    <Route path='/movies/:movieId' render={({match, history}) => {
                        const locatedMovie = movies.find(m => {
                            if (m._id === match.params.movieId) {
                                return true;
                            }
                            return false;
                        });

                        return (
                            <>
                                {locatedMovie && <MovieView
                                    movie={locatedMovie}
                                />}
                                {!locatedMovie && <h2>Loading...</h2>}
                            </>
                        )
                    }} />

                    <Route path='/genres/:name' render={({match, history}) => {
                        return <GenreView
                            genre={match.params.name}
                            movies={movies.filter(m => m.genre.name == match.params.name)}
                        />
                    }} />

                    <Route path='/directors/:name' render={({match, history}) => {
                        return <DirectorView
                            director={match.params.name}
                            movies={movies.filter(m => m.director.name == match.params.name)} />
                    }} />

                    <Route path='/user' render={() => {
                        const storageToken = localStorage.getItem('token');

                        if (!storageToken) {
                            return <Redirect to='/login' />
                        } else {
                            return <UserView getUser={() => this.getUser()} />
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

    getUser() {
        const token = localStorage.getItem('token');

        if(!token) {
            return this.props.setUser({});
        }

        axios.get(`${process.env.API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => {
            this.props.setUser({
                ...res.data,
                birthdate: res.data.birthdate.split('T')[0],
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    getMovies() {
        axios.get(`${process.env.API_URL}/movies`,)
        .then((res) => {
            this.props.setMovies(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);
