import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { MovieCard } from '../movie-card/movie-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
}

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.title.toLowerCase().includes(visibilityFilter.toLowerCase()))
    }

    if (!movies) {
        return <div className='main-view'></div>
    }

    function mapCards(m) {
        return <Col key={m._id} md={3}>
            <MovieCard key={m._id} movie={m} />
        </Col>
    }

    return <>
        <Row>
            <Col md={12} className="mt-3 mb-5">
                <VisibilityFilterInput visibilityFilter={visibilityFilter} />
            </Col>
        </Row>
        <Row>
            {filteredMovies.map(mapCards)}
        </Row>
    </>
}

export default connect(mapStateToProps)(MoviesList);
