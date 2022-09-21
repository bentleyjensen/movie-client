import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Form } from "react-bootstrap";
import { setFilter } from "../../actions/actions";

class VisibilityFilterInput extends React.Component {
    constructor (props) {
        super(props);
    }

    componentWillUnmount() {
        this.props.setFilter('');
    }

    render(){
        return ( <Form.Control
            onChange={e => this.props.setFilter(e.target.value)}
            value={this.props.visibilityFilter}
            placeholder="Search" />
        )
    }
}

export default connect(null, {setFilter})(VisibilityFilterInput);

VisibilityFilterInput.propTypes = {
    setFilter: PropTypes.func,
}
