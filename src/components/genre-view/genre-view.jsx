import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import MoviesList from "../movies-list/movies-list";

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
}

class GenreView extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        const { genre, movies, visibilityFilter } = this.props;
        let filteredMovies = movies;

        if (visibilityFilter !== '') {
            filteredMovies = movies.filter(m => m.title.toLowerCase().includes(visibilityFilter.toLowerCase()))
        }

         return (
            <Container>
                <Row>
                    <Col>
                        <h2 className="text-center">Movies in the {genre} genre</h2>
                    </Col>
                    <Col md={1}>
                        <Button variant="primary" onClick={() => window.history.back()}>Back</Button>
                    </Col>
                </Row>
                <Row className='justify-content-md-center mt-3 mx-1'>
                    {(!filteredMovies || movies.length === 0) && <h3 className="text-center">No {genre} movies found</h3>}
                    {filteredMovies && <MoviesList movies={filteredMovies} />}
                </Row>
            </Container>
         );
    }
}

export default connect(mapStateToProps)(GenreView);

GenreView.propTypes = {
    genre: PropTypes.string.isRequired,
    movies: PropTypes.array,
}
