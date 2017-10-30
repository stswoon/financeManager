import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './App.jsx';
import './style.less'
import {BrowserRouter} from 'react-router-dom';

render(
    <AppContainer>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </AppContainer>,
    document.querySelector("#root")
);

if (module && module.hot) { //todo also for redux
    module.hot.accept('./App.jsx', () => {
        const App = require('./App.jsx').default;
        render(
            <AppContainer>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </AppContainer>,
            document.querySelector("#root")
        );
    });
}
