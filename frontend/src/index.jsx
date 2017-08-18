import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './App.jsx';
import './style.less'

render(<AppContainer><App/></AppContainer>, document.querySelector("#root"));

if (module && module.hot) {
    module.hot.accept('./App.jsx', () => {
        const App = require('./App.jsx').default;
        render(
            <AppContainer>
                <App/>
            </AppContainer>,
            document.querySelector("#root")
        );
    });
}
