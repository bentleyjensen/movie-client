import React from 'react';
import ReactDOM from 'react-dom';

// import for bundle reasons
import './index.scss';

// Main component
class MovieApplication extends React.Component {
    render() {
        return (
            <div className='movie-client'>
                <div>Good morning</div>
            </div>
        )
    }
}

// Locate root
const container = document.getElementsByClassName('app-container')[0];

// Render main component at root
ReactDOM.render(React.createElement(MovieApplication), container)
