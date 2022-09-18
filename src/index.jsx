import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import moviesApp from './reducers/reducers';

// import for bundle reasons
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer())

// Main component
class MovieApplication extends React.Component {
    render() {
        return (
            <Container fluid>
                <Provider store={store}>
                    <MainView />
                </Provider>
            </Container>
        )
    }
}

// Locate root
const container = document.getElementsByClassName('app-container')[0];

// Render main component at root
ReactDOM.render(React.createElement(MovieApplication), container)
