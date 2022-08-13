import React from 'react';
import ReactDom from 'react-dom';

// import for bundle reasons
import './index.sxcss';

// Main component
class MovieApplication extends React.Component {
    render() {
        return (
            <div classname='movie-client'>
                <div>Good morning</div>
            </div>
        )
    }
}

// Locate root
const container = document.getElementsByClassName('app-container')[0];

// Render main component at root
ReactDOM.render(React.createElement(MovieApplication), container)
