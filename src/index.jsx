import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';

// import for bundle reasons
import './index.scss';

// Main component
class MovieApplication extends React.Component {
    render() {
        return (
            <Container>
                <MainView />
            </Container>
        )
    }
}

// Locate root
const container = document.getElementsByClassName('app-container')[0];

// Render main component at root
ReactDOM.render(React.createElement(MovieApplication), container)
