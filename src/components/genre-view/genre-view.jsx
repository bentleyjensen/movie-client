import React from "react";
import { PropTypes } from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export class GenreView extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        const {genre, movies} = this.props;
         return (
            <Container>
                <Row>
                    <Col>
                        <h2 className="text-center">Movies in the {genre} genre</h2>
                    </Col>
                    <Col md={1}>
                        <Button variant="primary" onClick={() => {this.props.onBackClick()}}>Back</Button>
                    </Col>
                </Row>
                <Row>
                     {(!movies || movies.length === 0) && <h3 className="text-center">No {genre} movies found</h3>}
                    {movies && movies.map(m => {
                        return (
                            <Col md={4} key={m._id} className="my-3">
                                <MovieCard key={m._id} movie={m} />
                            </Col>
                        )
                    })}
                </Row>
            </Container>
         );
    }
}

GenreView.propTypes = {
    genre: PropTypes.string.isRequired,
    movies: PropTypes.array,
}
