import React from "react";
import { PropTypes } from "prop-types";

import { MovieCard } from "../movie-card/movie-card";

import { Container, Row, Col, Button } from "react-bootstrap";

export class DirectorView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { director, movies } = this.props;
        return(
            <Container>
                <Row>
                    <Col>
                        <h1 className="text-center">Movies directed by {director}</h1>
                    </Col>
                    <Col md={1}>
                        <Button variant="primary" onClick={() => this.props.onBackClick()}>Back</Button>
                    </Col>
                </Row>
                <Row>
                    {movies.length === 0 && <Col><p>No movies Found</p></Col>}
                    {movies.map(m => {
                        return (
                            <Col md={4} key={m._id} className="my-3">
                                <MovieCard key={m._id} movie={m} />
                            </Col>
                        );
                    })}
                </Row>
            </Container>

        )
    }

    // getMovies() {
    //     axios.get(`${process.env.API_URL}/directors/${this.props.director}`)
    //     .then((result) => {
    //         if (result && result.name) {
    //             this.setState({director: result.data})
    //         }
    //     }).catch((err) => {
    //         console.log('Error fetching movies:');
    //         console.log(err);
    //     })
    // }
}

DirectorView.propTypes = {
    director: PropTypes.string.isRequired,
    movies: PropTypes.array,
};
